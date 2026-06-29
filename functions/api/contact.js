const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
};

const validationError = {
  ok: false,
  code: "VALIDATION_ERROR",
  message: "Please complete the required fields."
};

const contactDbNotConfigured = {
  ok: false,
  code: "CONTACT_DB_NOT_CONFIGURED",
  message: "Contact storage is not configured."
};

const contactStorageFailed = {
  ok: false,
  code: "CONTACT_STORAGE_FAILED",
  message: "Contact inquiry could not be recorded."
};

const turnstileNotConfigured = {
  ok: false,
  code: "TURNSTILE_NOT_CONFIGURED",
  message: "Contact verification is not configured."
};

const turnstileValidationFailed = {
  ok: false,
  code: "TURNSTILE_VALIDATION_FAILED",
  message: "Human verification failed. Please try again."
};

const json = (body, status, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...headers
    }
  });

const textValue = (value) => (typeof value === "string" ? value.trim() : "");

const truncateText = (value, maxLength) => textValue(value).slice(0, maxLength);

const safeSourcePage = (value) => {
  const source = textValue(value);
  if (!source) {
    return "";
  }

  if (source.startsWith("/") && !source.startsWith("//")) {
    return source.slice(0, 500);
  }

  try {
    const url = new URL(source);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return "";
    }
    return `${url.origin}${url.pathname}`.slice(0, 500);
  } catch {
    return "";
  }
};

const generateId = () => {
  if (globalThis.crypto?.randomUUID) {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

const hashUserAgent = async (value) => {
  const userAgent = textValue(value);
  if (!userAgent || !globalThis.crypto?.subtle) {
    return "";
  }

  const encoded = new TextEncoder().encode(userAgent);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

const verifyTurnstile = async ({ secret, token, request }) => {
  const body = {
    secret,
    response: token
  };
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) {
    body.remoteip = remoteIp;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const result = await response.json().catch(() => ({}));
  return result.success === true;
};

export async function onRequest({ request, env }) {
  if (request.method !== "POST") {
    return json(
      {
        ok: false,
        code: "METHOD_NOT_ALLOWED",
        message: "Method not allowed."
      },
      405,
      { allow: "POST" }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(validationError, 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return json(validationError, 400);
  }

  if (textValue(payload.website)) {
    return json(
      {
        ok: true,
        message: "Thank you."
      },
      200
    );
  }

  const name = textValue(payload.name);
  const workEmail = textValue(payload.workEmail);
  const message = textValue(payload.message);
  const consent = payload.consent === true;
  const turnstileToken = textValue(payload.turnstileToken);

  if (!name || !workEmail || !message || !consent) {
    return json(validationError, 400);
  }

  if (message.length > 5000) {
    return json(validationError, 400);
  }

  if (!turnstileToken) {
    return json(turnstileValidationFailed, 403);
  }

  const turnstileSecret = textValue(env?.TURNSTILE_SECRET_KEY);
  if (!turnstileSecret) {
    return json(turnstileNotConfigured, 500);
  }

  let turnstileOk = false;
  try {
    turnstileOk = await verifyTurnstile({
      secret: turnstileSecret,
      token: turnstileToken,
      request
    });
  } catch {
    turnstileOk = false;
  }

  if (!turnstileOk) {
    return json(turnstileValidationFailed, 403);
  }

  const contactDb = env?.CONTACT_DB;
  if (!contactDb || typeof contactDb.prepare !== "function") {
    return json(contactDbNotConfigured, 500);
  }

  const id = generateId();
  const createdAt = new Date().toISOString();
  const sourcePage =
    safeSourcePage(payload.sourcePage) || safeSourcePage(request.headers.get("Referer"));
  const userAgentHash = await hashUserAgent(request.headers.get("User-Agent"));
  const cfCountry = truncateText(request.cf?.country, 32);
  const cfColo = truncateText(request.cf?.colo, 32);

  try {
    await contactDb
      .prepare(
        `INSERT INTO contact_inquiries (
          id,
          created_at,
          source_page,
          name,
          company,
          work_email,
          service_area,
          message,
          status,
          user_agent_hash,
          cf_country,
          cf_colo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        id,
        createdAt,
        sourcePage,
        truncateText(payload.name, 200),
        truncateText(payload.company, 200),
        truncateText(payload.workEmail, 320),
        truncateText(payload.serviceArea, 120),
        message,
        "new",
        userAgentHash,
        cfCountry,
        cfColo
      )
      .run();
  } catch {
    return json(contactStorageFailed, 500);
  }

  return json(
    {
      ok: true,
      code: "CONTACT_INQUIRY_RECORDED",
      message: "Your request has been recorded. Notification is not enabled yet.",
      id
    },
    200
  );
}

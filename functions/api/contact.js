const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
};

const validationError = {
  ok: false,
  code: "VALIDATION_ERROR",
  message: "Please complete the required fields."
};

const deliveryNotEnabled = {
  ok: false,
  code: "CONTACT_DELIVERY_NOT_ENABLED",
  message: "Contact endpoint is protected, but message delivery is not enabled yet."
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

  return json(deliveryNotEnabled, 503);
}

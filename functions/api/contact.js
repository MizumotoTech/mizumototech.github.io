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
  message: "Contact endpoint is deployed, but message delivery is not enabled yet."
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

export async function onRequest({ request }) {
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

  if (!name || !workEmail || !message || !consent) {
    return json(validationError, 400);
  }

  return json(deliveryNotEnabled, 503);
}

# Checkpoint 000: Cloudflare Pages Preview Baseline

## Produced

- Root-level `PRD.md` for the Cloudflare migration product requirements.
- Root-level `CONTEXT.md` for future engineering and Codex context.
- Root-level `checkpoint.md` for the current baseline and next-action ledger.

## Verified

- The repository contains the current static website entry points, including `index.html`, `docs.html`, and `zh.html`.
- No root `README.md` is present at this checkpoint.
- The existing English and Chinese contact sections are static sections, not real forms.
- The current Cloudflare Pages preview renders the same public content as the current `https://www.mizumoto.tech` site.
- No website behavior changes are part of this checkpoint.

## Known Gaps

- Contact section is not a real form.
- No `/api/contact` endpoint.
- No Turnstile validation.
- No email delivery.
- Production domain is not yet confirmed on Cloudflare Pages.
- DNS/email migration must be handled carefully later.

## Bugs Caught

- The contact path can be mistaken for complete because the page has a visible contact section. It is only static content today.
- DNS migration can be mistaken as the next step because the Cloudflare Pages preview works. The next engineering step should be contact form implementation first.
- Email delivery can be conflated with DNS or email migration. It should be designed and implemented as a separate controlled step.

## Next Actions

1. Implement the main-site contact form frontend.
2. Add a same-origin `/api/contact` endpoint.
3. Add server-side validation for contact submissions.
4. Add Cloudflare Turnstile with server-side verification.
5. Choose and implement an explicit email delivery path that does not expose a real personal email address.
6. Prepare a production domain migration checkpoint after the contact path is understood.
7. Handle DNS and email migration as careful, separate changes.

## Open Questions

- What fields should the first contact form collect beyond name, organization, reply contact, and message?
- What email delivery provider should be used with Cloudflare Pages?
- What sender and reply-to model should be used without exposing a real personal email address?
- What rate limits, logging limits, and retention expectations should apply to `/api/contact`?
- What rollback checklist should be used before production domain migration?

# Checkpoint 001: Agent Instruction Simplification

## Produced

- `AGENTS.md` was simplified into a short principles-only operating contract.
- Project facts, safety boundaries, imported-content rules, deployment workflow facts, and content discipline were consolidated into `CONTEXT.md`.
- The Cloudflare migration product direction remains in `PRD.md`.

## Verified

- `AGENTS.md` now points agents to `CONTEXT.md`, `PRD.md`, and `checkpoint.md` instead of carrying detailed project state itself.
- The next engineering step remains contact form implementation, not DNS migration.
- No public website behavior changes are part of this checkpoint.

## Known Gaps

- Contact section is still not a real form.
- No `/api/contact` endpoint.
- No Turnstile validation.
- No email delivery.
- Production domain migration remains a later controlled step.

# Checkpoint 002: Contact Form Frontend Only

## Produced

- Replaced the English contact section static email path with an accessible frontend form in `index.html`.
- Applied the equivalent Chinese frontend form in `zh.html`.
- Added contact-form-only styling in the existing site stylesheet.
- Added frontend submit interception in the existing page scripts.

## Verified

- The contact forms include name, company, work email, service area, message, consent checkbox, hidden honeypot field, and submit button.
- Required fields use native frontend validation for name, work email, message, and consent.
- Submitting a valid form is intercepted on the frontend and displays an inline endpoint-disabled status message.
- No fake success message is shown.
- No real personal email address is exposed in the updated contact sections.
- No backend file, Cloudflare Function, Worker, Turnstile, email delivery, DNS, dependency, CRM, database, or analytics change is part of this checkpoint.

## Known Gaps

- No `/api/contact` endpoint yet.
- No Turnstile validation yet.
- No email delivery yet.
- Form submission is intentionally intercepted on the frontend.
- Production contact path is not live yet.

## Bugs Caught

- The previous contact section could be mistaken for an active contact path because it showed a contact instruction. The new form explicitly reports that the endpoint is not enabled.
- The old contact copy exposed an obfuscated email-like address. The frontend form removes that from the main contact path.

## Next Actions

- Checkpoint 003: Contact Endpoint Skeleton.

# Checkpoint 003 - Contact Endpoint Skeleton

## Produced

- Added a minimal Cloudflare Pages Function at `functions/api/contact.js`.
- Updated the English contact form to POST JSON to `/api/contact`.
- Updated the Chinese contact form to POST JSON to `/api/contact`.
- Preserved native frontend validation and inline contact status messaging.

## Verified

- `POST /api/contact` accepts JSON request bodies.
- Non-POST methods return controlled 405 JSON.
- Missing required fields return controlled 400 JSON.
- Honeypot-filled submissions return generic success-like JSON without exposing anti-spam handling.
- Valid human submissions return `CONTACT_DELIVERY_NOT_ENABLED` JSON.
- The frontend does not navigate away on submit and does not show a fake success message.
- No email, Turnstile, DNS, dependency, CRM, database, analytics, queue, or storage behavior is part of this checkpoint.

## Known Gaps

- No Turnstile validation yet.
- No email delivery yet.
- No rate limiting beyond honeypot/basic validation.
- Contact endpoint intentionally returns delivery-not-enabled status for real submissions.
- Production contact path is not live for message delivery yet.

## Bugs Caught

- The frontend-only checkpoint could not prove same-origin endpoint wiring. This checkpoint adds the Pages Function route while keeping delivery disabled.
- The frontend field name for work email previously used a generic `email` key. It now sends the endpoint contract field `workEmail`.

## Next Actions

- Checkpoint 004: Turnstile Frontend and Server-Side Validation.

# Checkpoint 004 - Turnstile Frontend and Server-Side Validation

## Produced

- Added the Cloudflare Turnstile script to `index.html` and `zh.html`.
- Added Turnstile widgets inside both contact forms using the public site key.
- Updated frontend JSON submission to include the token from `cf-turnstile-response`.
- Added server-side Turnstile Siteverify validation in `functions/api/contact.js`.
- Kept email delivery disabled after successful verification.

## Verified

- `functions/api/contact.js` still returns controlled JSON for non-POST methods.
- Required field validation still runs before Turnstile validation.
- Honeypot-filled submissions still return generic success-like JSON without calling Turnstile.
- Missing Turnstile tokens return controlled `TURNSTILE_VALIDATION_FAILED` JSON.
- Missing `TURNSTILE_SECRET_KEY` returns controlled `TURNSTILE_NOT_CONFIGURED` JSON.
- Successful Turnstile validation continues to `CONTACT_DELIVERY_NOT_ENABLED`.
- No email, DNS, dependency, CRM, database, analytics, queue, or storage behavior is part of this checkpoint.

## Known Gaps

- No email delivery yet.
- No rate limiting beyond Turnstile, honeypot, and basic validation.
- Contact endpoint still intentionally returns delivery-not-enabled status for real submissions.
- Production contact path is not live for message delivery yet.

## Bugs Caught

- The contact endpoint skeleton accepted valid-looking human submissions without human verification. This checkpoint requires a Turnstile token and validates it server-side.
- The frontend payload previously had no verification token. It now includes the value generated as `cf-turnstile-response`.

## Next Actions

- Checkpoint 005: D1 Contact Inquiry Storage.

# Checkpoint 005 - D1 Contact Inquiry Storage

## Produced

- Added `db/contact_inquiries.sql` with the `contact_inquiries` D1 table and indexes.
- Updated `/api/contact` to insert verified human submissions into the `CONTACT_DB` D1 binding after Turnstile validation succeeds.
- Added controlled JSON responses for missing D1 binding and D1 insert failure.
- Updated English and Chinese form status handling for `CONTACT_INQUIRY_RECORDED`.

## Verified

- Non-POST methods still return controlled 405 JSON.
- Missing required fields still return `VALIDATION_ERROR`.
- Honeypot-filled submissions short-circuit without Turnstile validation or D1 insert.
- Missing Turnstile secret, missing Turnstile token, and failed Turnstile validation still return controlled JSON.
- Missing `CONTACT_DB` returns `CONTACT_DB_NOT_CONFIGURED`.
- Successful Turnstile validation plus successful D1 insert returns `CONTACT_INQUIRY_RECORDED`.
- D1 insert failure returns `CONTACT_STORAGE_FAILED`.
- Turnstile token is not stored.
- Raw user agent is not stored; only a SHA-256 hash is stored when hashing is available.
- No email, webhook, DNS, dependency, CRM, analytics, queue, KV, R2, or Durable Object behavior is part of this checkpoint.

## Known Gaps

- Internal notification webhook is not implemented yet.
- No email delivery.
- No customer auto-reply.
- No admin dashboard.
- Contact path should not be considered fully live until internal notification is implemented and copy is updated.

## Bugs Caught

- The previous contact endpoint could validate humans but still discarded valid inquiries. This checkpoint records validated inquiries in D1.
- The previous success path could only report delivery-not-enabled. The new success path reports storage only and avoids implying live handling.

## Next Actions

- Checkpoint 006: Internal Notification Webhook.

# Checkpoint 006 - Internal Notification Webhook

## Produced

- Added a best-effort Telegram internal notification attempt after successful D1 contact inquiry storage.
- Kept D1 as the source of truth; Telegram is only an internal alert channel.
- Added D1 status updates for notification outcomes: `notified` when Telegram succeeds and `stored_notification_failed` when Telegram is missing or fails.
- Kept the Telegram message to a minimal internal summary without the full inquiry message body, Turnstile token, or raw User-Agent.
- Updated the `/api/contact` success response message to state that internal notification status is tracked separately.

## Verified

- D1 insert still succeeds before any Telegram notification attempt.
- Telegram success does not change the user-facing response code; the endpoint still returns `CONTACT_INQUIRY_RECORDED`.
- Missing Telegram environment variables do not fail the contact submission.
- Telegram API failure does not fail the contact submission.
- Inquiry status becomes `notified` when Telegram succeeds.
- Inquiry status becomes `stored_notification_failed` when Telegram environment variables are missing or Telegram fails.
- Full inquiry message body is not sent to Telegram.
- No email, customer auto-reply, DNS, dependency, CRM, analytics, queue, KV, R2, Durable Object, or admin dashboard behavior is part of this checkpoint.

## Known Gaps

- No customer auto-reply.
- No email delivery.
- No admin dashboard.
- No formal CRM.
- Contact form live copy is not finalized until webhook behavior is verified on Cloudflare Pages preview.

## Bugs Caught

- The previous stored-in-D1 success path had no internal alert channel, so new inquiries could be recorded without an operator-facing notification.
- Notification failure could have been coupled to the user submission path. This checkpoint keeps the inquiry recorded and tracks notification failure in D1 instead.

## Next Actions

- Checkpoint 007: Contact Form Live Copy.

# Checkpoint 006A - Contact Submit Pending State

## Produced

- Added localized pending status text for the English and Chinese contact forms.
- Added a visible CSS-only spinner in the existing contact status area while submission is pending.
- Added a form-level pending guard to prevent duplicate submissions while `/api/contact` is in flight.
- Added `aria-busy` on the form during pending submission and restored it after a terminal response or network error.
- Kept existing response-code mapping and form data preservation behavior.
- Added best-effort Turnstile reset after failed requests so normal retries do not require a page refresh when reset is available.

## Verified

- `git diff --check` passes.
- Inline scripts in `index.html` and `zh.html` parse successfully.
- A local DOM harness using the real inline contact script verifies that the English pending state shows `Submitting...` with a spinner immediately after submit.
- A local DOM harness using the real inline contact script verifies that the Chinese pending state shows `正在提交……` with a spinner immediately after submit.
- The same harness verifies that the submit button is disabled while pending and duplicate submit attempts are ignored while pending.
- The same harness verifies that final success responses replace pending text with the existing recorded/status message.
- The same harness verifies that error responses restore submit ability, keep the existing localized error/status mapping, and call best-effort Turnstile reset when available.
- Browser preview loading confirms the contact form remains present and visible; full synthetic click submission was limited by the in-app browser control layer and should still be checked on Cloudflare Pages preview.
- No backend, D1, Telegram, DNS, dependency, CRM, analytics, queue, KV, R2, Durable Object, email, or customer auto-reply behavior is part of this checkpoint.

## Known Gaps

- Contact form live copy is still not finalized.
- No customer auto-reply.
- No admin dashboard.
- No formal CRM.
- Turnstile retry behavior may still require widget reset depending on error type.

## Bugs Caught

- The contact form could appear frozen while Turnstile, D1, or Telegram processing was in flight.
- The previous frontend disabled the button during fetch, but did not have a form-level pending guard for duplicate submit events.

## Next Actions

- Checkpoint 007: Contact Form Live Copy.

# Checkpoint 006B - Contact Submit Blocking Overlay

## Produced

- Added one full-viewport contact submit overlay to the English page.
- Added one full-viewport contact submit overlay to the Chinese page.
- Replaced the inline pending spinner behavior with overlay show/hide behavior while preserving the existing final status area.
- Added restrained overlay, loading card, and CSS-only spinner styles with reduced-motion support.
- Preserved pending guard, disabled submit button behavior, `aria-busy`, existing response-code mapping, and best-effort Turnstile reset after failures.

## Verified

- `git diff --check` passes.
- Inline scripts in `index.html` and `zh.html` parse successfully.
- A local DOM harness using the real inline contact script verifies that the English overlay becomes visible during pending submission and hides after success.
- A local DOM harness using the real inline contact script verifies that the Chinese overlay becomes visible during pending submission and hides after success.
- The same harness verifies overlay hide behavior after error, duplicate-submit prevention, submit button restoration, and existing success/error status mapping.
- Browser preview loading confirms the contact form and overlay markup are present; full synthetic form submission should still be checked on Cloudflare Pages preview with the real browser environment.
- No backend, D1, Telegram, DNS, dependency, CRM, analytics, queue, KV, R2, Durable Object, email, or customer auto-reply behavior is part of this checkpoint.

## Known Gaps

- Contact form live copy is still not finalized.
- No customer auto-reply.
- No admin dashboard.
- No formal CRM.

## Bugs Caught

- The inline pending state did not fully block background interaction while the request was in flight.
- Pending feedback could be too easy to miss because it appeared only inside the contact form status area.

## Next Actions

- Checkpoint 007: Contact Form Live Copy.

# Checkpoint 007 - Contact Form Live Copy and Submitted State

## Produced

- Updated English and Chinese contact section helper copy for live use.
- Updated English and Chinese success messages to conservative received-and-review copy.
- Removed user-facing references to internal notification, D1, Telegram, and backend implementation details from the active contact form path.
- Added a submitted state after `CONTACT_INQUIRY_RECORDED`.
- Disabled all form controls after successful submission and changed the submit button text to a submitted-state label.
- Added submitted-state styling that greys out the form controls while keeping the final status message visible.
- Aligned the `/api/contact` success response message with the live frontend success copy without changing endpoint logic.

## Verified

- `git diff --check` passes.
- Inline scripts in `index.html` and `zh.html` parse successfully.
- `node --check functions/api/contact.js` passes.
- A local DOM harness using the real inline contact script verifies that successful English submissions show the conservative success message, disable all controls, preserve input values, and change the submit button to `Request submitted`.
- A local DOM harness using the real inline contact script verifies that successful Chinese submissions show the conservative success message, disable all controls, preserve input values, and change the submit button to `已提交`.
- The same harness verifies that error responses do not enter submitted state and remain retryable.
- Pending overlay behavior remains present in the submit path.
- Browser preview loading confirms the English and Chinese live copy renders, the form is not submitted by default, and static-server error responses keep the form editable and retryable.
- No email, customer auto-reply, DNS, dependency, CRM, analytics, queue, KV, R2, Durable Object, or admin dashboard behavior is part of this checkpoint.

## Known Gaps

- No customer auto-reply.
- No admin dashboard.
- No formal CRM.
- No rate limiting beyond Turnstile, honeypot, and basic validation.
- No production-domain cutover yet if `mizumoto.tech` is not already pointed to Cloudflare Pages.

## Bugs Caught

- Previous live-path copy still described internal notification state instead of a customer-safe received-and-review message.
- Previous successful submissions allowed the form to become editable again after the backend returned success, which could invite accidental duplicate submissions.

## Next Actions

- Checkpoint 008: Production Domain and DNS Cutover Planning.
- Optional later: rate-limit hardening.
- Optional later: admin/review workflow.

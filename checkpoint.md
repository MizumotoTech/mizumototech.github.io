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

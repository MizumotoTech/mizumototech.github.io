# Mizumoto Tech Website Cloudflare Migration PRD

## Current Status

The Mizumoto Tech website is connected to Cloudflare Pages. The current Cloudflare Pages preview renders the same public content as the current `https://www.mizumoto.tech` site.

The contact section is not yet a working form. It is currently a static contact section, and there is no same-origin contact endpoint, Turnstile validation, or email delivery path in this repository.

This repository remains a public, static-site-focused website repository. All changes must be safe for public release.

## Goals

- Move the whole Mizumoto Tech website to Cloudflare Pages.
- Keep the existing public site behavior stable while migration work is staged.
- Implement the contact path on the main site, not as a separate `contact.mizumoto.tech` mini-site.
- Use a same-origin contact endpoint such as `/api/contact`.
- Add Cloudflare Turnstile later with server-side validation.
- Add email delivery later through a Cloudflare-compatible email sending path or another explicitly chosen provider.
- Avoid exposing a real personal email address.
- Keep each migration step small, reviewable, and reversible.

## Non-Goals

- Do not implement the contact form in this documentation task.
- Do not add Cloudflare Functions in this documentation task.
- Do not add Turnstile in this documentation task.
- Do not add email delivery in this documentation task.
- Do not perform DNS migration in this documentation task.
- Do not perform email system migration in this documentation task.
- Do not redesign the website in this documentation task.
- Do not add dependencies in this documentation task.
- Do not add a backend, database, CRM, admin dashboard, analytics, or third-party scripts unless explicitly requested later.

## Scope Tiers

### Tier 0: Cloudflare Pages Preview Baseline

Confirm that Cloudflare Pages can render the current public website content without behavior or visual regressions.

### Tier 1: Canonical Docs

Add root-level project documents that define the migration context, safety contract, checkpoints, and next engineering direction.

### Tier 2: Contact Form Frontend

Replace or extend the static contact section with a real form on the main site. The frontend should remain same-site, conservative, accessible, and public-safe.

### Tier 3: `/api/contact` Server-Side Endpoint

Add a same-origin server-side endpoint for contact submissions. The endpoint should validate input, reject malformed submissions, and avoid logging sensitive data.

### Tier 4: Turnstile Server-Side Validation

Add Cloudflare Turnstile to the contact path. Validation must happen server-side before any email delivery attempt.

### Tier 5: Email Delivery

Choose and implement an explicit email delivery path compatible with Cloudflare Pages and the repository safety rules. The implementation must avoid exposing a real personal email address.

### Tier 6: Production Domain Migration

Move the production domain to Cloudflare Pages only after the preview, contact path, and operational rollback expectations are understood. DNS and email migration must be handled carefully and separately.

### Tier 7: Post-Launch Hardening

Review logs, error handling, spam behavior, privacy exposure, rollback steps, and operational runbooks after the production migration.

## Safety Contract

- Do not expose real personal email addresses.
- Do not fake clients, cases, logos, team size, or guaranteed results.
- Do not combine DNS migration, email migration, and contact form implementation in one uncontrolled change.
- Do not add dependencies unless explicitly requested.
- Do not change unrelated files.
- Do not add CRM, database, admin dashboard, or analytics unless explicitly requested.
- Keep contact implementation low-risk and reviewable.
- Keep this repository public-safe.
- Do not add private repository access, private repository tokens, customer details, internal endpoints, payment details, or operational secrets.
- Do not imply that Mizumoto Tech is a mature agency, large team, certified partner, or guaranteed-savings provider unless explicitly documented and approved.

## Deliverables

- `PRD.md`: canonical product and migration requirements.
- `CONTEXT.md`: canonical project context for future engineering and Codex work.
- `checkpoint.md`: current baseline checkpoint and next-action ledger.
- Later Tier 2 deliverable: main-site contact form frontend.
- Later Tier 3 deliverable: `/api/contact` endpoint.
- Later Tier 4 deliverable: Turnstile server-side validation.
- Later Tier 5 deliverable: email delivery integration.
- Later Tier 6 deliverable: production domain migration plan and execution record.
- Later Tier 7 deliverable: hardening notes and follow-up fixes.

## Decision Ledger

| Date | Decision | Status |
| --- | --- | --- |
| 2026-06-27 | Treat Cloudflare Pages preview parity as the baseline before deeper migration work. | Accepted |
| 2026-06-27 | Keep the contact path on the main website rather than building a separate contact subdomain mini-site. | Accepted |
| 2026-06-27 | Prefer a same-origin `/api/contact` endpoint for contact submissions. | Accepted |
| 2026-06-27 | Defer Turnstile until the server-side contact endpoint exists. | Accepted |
| 2026-06-27 | Defer email delivery provider selection until contact endpoint requirements are clear. | Accepted |
| 2026-06-27 | Treat contact implementation as the next engineering step before production DNS migration. | Accepted |
| 2026-06-27 | Keep DNS migration, email migration, visual redesign, and contact implementation as separate controlled changes. | Accepted |

## Future Checkpoints

- Checkpoint 001: Tier 2 contact form frontend plan and implementation.
- Checkpoint 002: Tier 3 `/api/contact` endpoint implementation.
- Checkpoint 003: Tier 4 Turnstile server-side validation.
- Checkpoint 004: Tier 5 email delivery provider selection and implementation.
- Checkpoint 005: Tier 6 production domain migration readiness review.
- Checkpoint 006: Tier 6 production domain migration completion.
- Checkpoint 007: Tier 7 post-launch hardening review.

# AGENTS.md

This file is the short operating contract for agents working in this public
repository. Keep it principle-oriented. Put project facts, migration state,
and implementation decisions in the canonical root documents:

- `CONTEXT.md`
- `PRD.md`
- `checkpoint.md`

## Read Order

Before changing code or content, read:

1. `AGENTS.md`
2. `CONTEXT.md`
3. `PRD.md`
4. `checkpoint.md`
5. The specific files required for the task

## Principles

- Treat every repository file, commit, workflow log, pull request, issue, and
  build artifact as public.
- Keep changes small, reviewable, and directly tied to the requested task.
- Preserve the public/private boundary. Do not request private repository
  access, read private repositories, or add workflows that pull private content.
- Do not add secrets, credentials, customer details, private endpoints, payment
  details, or internal operating notes.
- Do not manually edit imported content unless the task explicitly asks for it.
- Keep public-facing copy conservative, verifiable, and free of fake clients,
  fake logos, fake team-size claims, or guaranteed results.
- Prefer static-site-friendly implementation. Do not add a backend, database,
  CRM, analytics, third-party scripts, or dependencies unless explicitly
  requested.
- For Cloudflare migration and contact-path work, follow `PRD.md` and keep DNS
  migration, email migration, contact implementation, and visual redesign as
  separate controlled changes.
- Verify the smallest relevant thing before finishing: build, preview, lint,
  sensitive-content search, or direct file inspection as appropriate.
- If a change would require private context, private credentials,
  customer-specific information, payment details, or internal business
  structure to explain or operate, it probably does not belong in this public
  repository.

## Updating Project Knowledge

- Update `CONTEXT.md` when repository facts, safety boundaries, domain language,
  or operating assumptions change.
- Update `PRD.md` when goals, non-goals, scope tiers, deliverables, or decisions
  change.
- Update `checkpoint.md` when a meaningful migration or implementation
  checkpoint is produced or verified.

# Mizumoto Tech Website Cloudflare Migration Context

## Domain Language

- **Mizumoto Tech**: the public-facing brand for a founder-led, company-backed cloud reliability engineering practice.
- **Founder-led**: direct senior involvement from scoping through review and delivery.
- **Scoped delivery**: bounded work with explicit outputs, review points, and handover expectations.
- **Reviewable engineering assets**: artifacts such as Terraform changes, CI/CD workflow updates, runbooks, review reports, risk notes, and handover documents that can be inspected and transferred.
- **Handover-ready cloud foundations**: GCP, GKE, Terraform, CI/CD, runbook, observability, and cost hygiene work prepared for ongoing operation by the client or partner team.
- **Contact path**: the full route from the public website contact UI to server-side validation and email delivery.
- **Same-origin endpoint**: an API route served from the main website origin, preferably `/api/contact`.
- **Turnstile**: Cloudflare anti-spam validation to be verified server-side before accepting contact submissions.

## Current Repo and Site Facts

- This repository hosts the public website for `mizumoto.tech`.
- The site is currently static-site friendly.
- The root contains `index.html`, `docs.html`, `zh.html`, `CNAME`, `AGENTS.md`, `assets/`, `content/`, `docs/`, and `sales/`.
- There is no root `README.md` at the time of this checkpoint.
- `index.html` is the main English page.
- `zh.html` is the Chinese page.
- `docs.html` renders approved public Markdown documents from the imported public-safe content area.
- The current contact section exists on the website, but it is not yet a real working form.
- This task must not change website behavior, public copy, CSS, JavaScript, or site routing.

## Repository Role and Boundaries

- This public repository builds, reviews, and deploys public-safe website content.
- It may receive reviewed public-safe export packages from a private content repository.
- It must not store private source materials.
- It must not read, clone, fetch, pull, or mirror any private repository.
- It must not hold credentials that can access private repositories.
- It must not manage internal business, payment, contract, settlement, customer, or operator details.
- Site source code and directly maintained public website pages live in this repository.
- Private notes, source materials, and internal sync design stay outside this repository.

## Public Safety Model

- All repository output must be safe for public release.
- Do not commit or generate client names, client-derived material, customer environment descriptions, incident raw material, postmortem raw material, real project IDs, real organization IDs, real IAM configuration, billing data, raw cost data, private endpoints, private DNS, internal-only URLs, access tokens, secrets, private keys, credentials, local machine paths, shell history, personal usernames, workstation-specific paths, operator notes, bank account details, contract entity details, payment paths, Wise details, or settlement details.
- Do not add any detail that can reveal a real customer, environment, account structure, or operating model.
- When unsure whether content is public-safe, leave it out and ask for clarification.

## Imported Content Model

- The current imported public-safe content root is `content/imported/sre-runbooks/`.
- Imported content should follow this flow: private content repository to public-safe export package to pull request to manual review to merge to deployment.
- Additional imported sources need a separate target root and review rules before use.
- Do not manually edit imported content unless there is a deliberate task-specific reason.
- Imported content pull requests should identify the source commit, export manifest, target root, exported file list, Markdown lint result, sensitive scan result, and manual review checklist.
- Before merging imported content, verify that the diff contains only expected public-safe files, appears generated from the approved export process, contains no private or sensitive operational details, and is appropriate for `mizumoto.tech`.

## Cloudflare Migration Facts

- The website is now connected to Cloudflare Pages.
- The current Cloudflare Pages preview works and renders the same content as the current `https://www.mizumoto.tech` site.
- Production domain migration is not yet confirmed on Cloudflare Pages.
- DNS migration must be handled carefully later.
- Email migration or email routing changes must be handled separately from DNS cutover and contact form implementation.
- The next engineering step is contact form implementation, not production DNS migration.

## Deployment and Workflow Facts

- The repository currently includes a GitHub Pages workflow at `.github/workflows/pages.yml`.
- The existing Pages workflow uses minimal deployment permissions: `contents: read`, `pages: write`, and `id-token: write`.
- Public repository workflows must not gain permissions or tokens that can read private repositories.
- Public repository workflows must not push to `main` unless a separate approved design explicitly requires it.
- Prefer pull-request-based review for public content and site structure changes.
- Before merging public website changes, check that the site builds or previews, configured lint passes if present, changed files have been searched for sensitive content, public copy is accurate, and domain or deployment settings are not unintentionally changed.
- If unsafe or incorrect content is published, revert the public repository change that introduced it. Do not roll back by pulling from or overwriting with a private repository.

## Contact Form Target Architecture

- The contact path should live on the main site.
- Do not build a separate `contact.mizumoto.tech` mini-site for the contact path.
- The preferred endpoint is a same-origin route such as `/api/contact`.
- The contact frontend should submit to the same-origin endpoint.
- Server-side validation should reject malformed, oversized, or incomplete submissions.
- Cloudflare Turnstile is the preferred anti-spam direction.
- Turnstile validation must be performed server-side.
- Email delivery should be added only after the endpoint and validation path are clear.
- Email delivery must avoid exposing a real personal email address.
- The implementation should avoid storing contact submissions unless an explicit storage requirement is approved later.

## Business Positioning Discipline

- Mizumoto Tech should remain positioned as a founder-led, company-backed cloud reliability engineering practice.
- The site should emphasize senior review, scoped delivery, reviewable engineering assets, and handover-ready cloud foundations.
- Relevant experience areas include GCP, GKE, Terraform, CI/CD, runbooks, observability, cost hygiene, operational readiness, and Japan-side production SRE experience.
- Cross-border collaboration may reference English, Japanese, and Chinese working contexts.
- Do not imply a mature agency, large team, fake team size, fake client logos, fake case studies, or guaranteed savings.
- Do not create public marketing claims during infrastructure or contact-path tasks.
- Keep public-facing wording conservative, accurate, and reviewable.

## Website Content and Commercial Copy

- Website copy should be public-safe, professional, concise, and oriented toward B2B SRE, platform engineering, cloud operations, and reliability services.
- Public pages should be suitable for Singapore, Australia, Japan, China, and other international B2B audiences.
- English is the default public website language unless a page is intentionally multilingual.
- Do not overstate business scale or claim certifications, partnerships, legal status, or company structure unless documented and approved.
- Pricing may be described only at a high level, such as hourly or project-based engagement, scope-dependent pricing, or discovery-based scoping.
- Do not mention payment rails, bank accounts, Wise, settlement structure, internal margin, tax, remittance notes, or contract entity details in normal website copy.

## Data and Privacy Constraints

- This is a public repository. Treat every file, commit, workflow log, pull request, issue, and build artifact as public.
- Do not commit secrets, private keys, access tokens, private endpoints, private DNS, customer names, customer environments, project IDs, organization IDs, raw billing data, or operational private details.
- Do not expose a real personal email address in website copy, repository docs, or implementation code.
- Do not add analytics, tracking, CRM, database storage, chat widgets, or third-party scripts unless explicitly requested.
- Contact submissions should collect only the minimum information needed for a scoped review request.
- Future contact implementation should avoid logging full message bodies or unnecessary personally identifiable information.

## DS/Codex Operating Discipline

- Start from the current repository state before editing.
- Keep changes surgical and tied directly to the requested scope.
- Do not modify imported content manually unless explicitly requested.
- Do not change public website behavior when the task is documentation-only.
- Do not add dependencies, build systems, Cloudflare Functions, DNS instructions, or provider integrations unless explicitly requested.
- Prefer small pull-request-sized changes with clear acceptance criteria.
- Preserve the distinction between public website presentation and private business operations.
- When uncertain whether a detail is public-safe, leave it out and ask for clarification.
- For the next task, define success as a working main-site contact form path staged before DNS migration.

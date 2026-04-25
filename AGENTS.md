# AGENTS.md

This repository hosts the public website for `mizumoto.tech`.
The repository is public. Treat every file, commit, workflow log, pull
request, issue, and build artifact as publicly visible.

## Repository Role

This repository is responsible for:

- Building and deploying the public website for `mizumoto.tech`.
- Hosting public-safe website content.
- Receiving reviewed public-safe content exported from the private content
  repository.
- Running the GitHub Pages build and deployment workflow.

This repository is not responsible for:

- Storing private source materials.
- Reading from private repositories.
- Holding credentials that can access private repositories.
- Managing internal business, payment, contract, or settlement details.
- Mirroring any private repository.

## Public Safety Rules

All content in this repository must be safe for public release.
Do not commit or generate content containing:

- Client names or client-derived raw material.
- Customer environment descriptions.
- Incident or postmortem raw material.
- Real project IDs.
- Real organization IDs.
- Real IAM configuration.
- Billing or raw cost data.
- Private endpoints.
- Private DNS.
- Internal-only URLs.
- Access tokens, secrets, private keys, or credentials.
- Local machine paths.
- Shell history.
- Personal usernames.
- Workstation-specific paths.
- Operator-specific notes.
- Bank account details.
- Contract entity details.
- Payment paths.
- Wise or other settlement details.
- Any detail that can reveal a real customer, environment, account
  structure, or operating model.

When unsure whether content is public-safe, do not add it.

## Relationship with the Private Content Repository

Some website content may be imported from a private content repository.
Imported content must follow this model:

```text
private content repository
-> public-safe export package
-> pull request to this repository
-> manual review
-> merge
-> GitHub Pages deployment
```

This repository must not check out, clone, pull, fetch, or otherwise read
the private content repository.

Public repository workflows must not hold tokens that can read private
repositories.

Do not implement workflows that reverse the direction of sync by pulling
private content into this repository.

## Imported Content Rules

The current private content import area is:

```text
content/imported/sre-runbooks/
```

Additional imported sources must define a separate target root and review
rules before use.

Do not manually edit imported content unless there is a deliberate reason.

When updating imported content, prefer updating the private source and
re-exporting it through a reviewed pull request.

Imported content pull requests should include:

* Source repository commit SHA.
* Export manifest path.
* Export target root.
* Exported file list.
* Markdown lint result.
* Sensitive scan result.
* Manual review checklist.

Before merging imported content, verify that:

* The diff contains only expected public-safe files.
* The files appear to be generated from an approved export process.
* No private content, sensitive operational details, or settlement details
    are present.
* The content is appropriate for mizumoto.tech.

## Website Content Rules

Website copy should be:

* Public-safe.
* Professional.
* Concise.
* Oriented toward B2B SRE, platform engineering, cloud operations, and
    reliability services.
* Suitable for audiences in Singapore, Australia, and other international
    markets.
* Written primarily in English unless a page is explicitly intended to be
    multilingual.

Avoid:

* Overstating business scale.
* Claiming certifications, partnerships, legal status, or company structure
    unless explicitly documented.
* Mentioning private operating details.
* Mentioning payment rails, bank accounts, Wise, or settlement structure in
    normal website copy.
* Publishing client-like examples unless they are fully synthetic or
    explicitly approved for public use.

## Brand and Domain Rules

The public website is for:

mizumoto.tech

The public repository is:

MizumotoTech/mizumototech.github.io

Use Mizumoto or Mizumoto Tech consistently as the public-facing brand
unless a later brand guideline changes this.

Do not imply that the brand is a large agency, managed service provider, or
incorporated entity unless that status is explicitly confirmed in public
website requirements.

Preferred positioning:

* Independent SRE / platform engineering support.
* Practical reliability support for small engineering teams.
* Cloud operations, observability, CI/CD, infrastructure review, and
    reliability improvement.
* International B2B technical service.

## Pricing and Commercial Copy Rules

Pricing may be described at a high level when appropriate.

Acceptable examples:

Hourly or project-based engagement.
Pricing depends on scope, time commitment, and response expectations.
Typical advisory or implementation support may be scoped after discovery.

Do not include:

* Bank account information.
* Specific payment paths.
* Contract entity details.
* Chinese company registration details.
* Wise or other settlement-specific details.
* Internal margin, tax, or remittance notes.

If pricing is mentioned, keep it public-facing and non-operational.

## Technical Implementation Rules

Prefer static-site friendly implementation.

The website should remain easy to deploy on GitHub Pages and easy to
migrate later if needed.

Do not introduce a backend, database, authentication system, or server-side
runtime unless explicitly approved.

Do not add third-party tracking, analytics, forms, chat widgets, or external
scripts unless explicitly approved.

If external services are added later, document:

* What data they collect.
* Why they are needed.
* Where configuration lives.
* How they can be disabled.

## GitHub Pages and Workflow Rules

The public repository is responsible for building and deploying the website
to GitHub Pages.

GitHub Pages workflows may use this repository’s own GITHUB_TOKEN for
Pages deployment.

Deployment workflows should use minimal permissions, such as:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Do not add permissions that allow access to private repositories.

Do not store private repository tokens, or any credential that can read
private repositories, in this repository.

Public repository workflows must not push to `main`. Pages deployment
should use GitHub Pages artifact deployment. Any exception requires a
separate approved design before implementation.

Prefer pull-request based review for content and site structure changes.

## Branch and Pull Request Rules

Changes to public website content or structure should go through pull
requests.

Before merging, check:

* The site builds successfully.
* The configured lint passes, if present.
* A sensitive-content scan or search has been run on changed files.
* No sensitive content is present.
* Imported content, if any, matches the expected export area.
* Public-facing wording is accurate and not misleading.
* Domain and deployment settings are not unintentionally changed.

Do not force-push or rewrite public main history unless there is a
separate emergency procedure.

## Rollback Rules

If unsafe or incorrect content is published, revert the public repository
pull request that introduced it.

Do not attempt to roll back by pulling from or overwriting with the private
repository.

After reverting, let the GitHub Pages workflow deploy the reverted state.

## File Ownership Guidance

Use this general separation:

* Site source code: maintained directly in this public repository.
* Public website pages: maintained directly in this public repository unless
    they are generated from imported content.
* Imported public-safe content: received through export pull requests.
* Private notes and source materials: remain in the private content
    repository.
* Internal sync design: remains in the private content repository.

## Agent Behavior

When acting as an automated or semi-automated coding agent in this
repository:

* Assume all outputs are public.
* Do not request or use private repository access.
* Do not create workflows that read private repositories.
* Do not add secrets. This public repository must not hold private
    repository read tokens; any exception requires a separate approved
    public-repository design.
* Do not add analytics or third-party scripts unless explicitly instructed.
* Do not include operational, customer, payment, or settlement details.
* Do not modify imported content manually unless the task explicitly asks
    for it.
* Prefer small, reviewable pull requests.
* Keep public-facing copy clear, conservative, and verifiable.
* Preserve the separation between website presentation and private business
    operations.

## Default Decision Rule

If a proposed change would require private context, private credentials,
customer-specific information, payment details, or internal business
structure to explain or operate, it probably does not belong in this public
repository.

Keep this repository public-safe, static-site focused, and deployment-only.

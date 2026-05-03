# Public Site Repository Structure Memo

Date: 2026-04-25

## Conclusion

Use a minimal static-site structure first. The next practical milestone is a
dummy public-safe page, followed by a GitHub Pages artifact deployment
workflow.

Keep permanent repository rules in `AGENTS.md`. Keep milestone planning in
this memo so operating rules and delivery state do not drift together.

## Current Constraints

- This repository is public.
- This repository must not read from private repositories.
- This repository must not hold private repository read tokens.
- Public website changes should go through pull requests.
- GitHub Pages deployment should use artifact deployment, not workflow pushes
  to `main`.
- Imported content, when introduced, should target
  `content/imported/sre-runbooks/` unless a separate source root is approved.

## Proposed File Structure

```text
.
|-- AGENTS.md
|-- docs/
|   `-- repo-structure-memo.md
|-- index.html
|-- assets/
|   |-- css/
|   |   `-- site.css
|   `-- img/
|-- content/
|   `-- imported/
|       `-- sre-runbooks/
`-- .github/
    `-- workflows/
        `-- pages.yml
```

## Structure Notes

- `index.html`: first dummy page and later the public homepage.
- `assets/css/site.css`: shared styling for the static site.
- `assets/img/`: public-safe images only. Do not add placeholders unless they
  are actually used.
- `content/imported/sre-runbooks/`: reserved for reviewed public-safe exports
  from the private content repository. Do not manually populate it before the
  first export PR.
- `.github/workflows/pages.yml`: future GitHub Pages deployment workflow using
  minimal permissions and artifact deployment.

## Milestones

### M0: Guardrails And Structure Memo

Goal: establish repository rules and the initial structure plan.

Verification:

- `AGENTS.md` exists and states the public/private boundary.
- This memo exists under `docs/`.
- No private repository access or secrets are configured.

### M1: Dummy Static Page

Goal: publish a minimal public-safe dummy page without a build system.

Scope:

- Add `index.html`.
- Add `assets/css/site.css` only if the dummy page needs shared CSS.
- Do not add JavaScript, analytics, forms, or external scripts.

Verification:

- Open `index.html` locally or serve the repository with a simple static server.
- Run a sensitive-content search on changed files.
- Run `git diff --check`.

### M2: GitHub Pages Deployment

Goal: deploy the dummy page through GitHub Pages.

Scope:

- Add `.github/workflows/pages.yml`.
- Use this repository's `GITHUB_TOKEN`.
- Use minimal permissions:
  - `contents: read`
  - `pages: write`
  - `id-token: write`
- Use GitHub Pages artifact deployment.
- Do not push generated files to `main`.

Verification:

- Pull request check shows the workflow uses artifact deployment.
- GitHub Pages deploys the dummy page successfully after merge.
- Workflow has no private repository checkout, clone, pull, fetch, or token.

### M3: Imported Content Path

Goal: introduce reviewed public-safe imported content only after the export
process is ready.

Scope:

- Populate `content/imported/sre-runbooks/` through a reviewed export PR.
- Include source commit SHA, manifest path, export target root, exported file
  list, markdown lint result, sensitive scan result, and manual review
  checklist.

Verification:

- Diff contains only expected public-safe imported files.
- Export metadata matches the approved source and target root.
- Sensitive scan result is attached to the PR.

### M4: English Public Service Page

Goal: replace the dummy page with accurate English public-facing Mizumoto
service copy.

Scope:

- Keep the site static.
- Keep claims conservative and verifiable.
- Avoid private operating, customer, payment, settlement, and internal business
  details.
- Use founder-led senior engineering positioning with direct senior review
  from scope definition to final validation.

Verification:

- Site builds or renders locally.
- Public copy review passes.
- Sensitive-content search passes.
- Fact statements about brand, rate, team structure, and delivery model are
  confirmed.

### M5: Chinese Delivery Model Page

Goal: add a Chinese audience page for incubator and domestic business readers
without making the site sound like generic offshore outsourcing.

Scope:

- Explain founder-led senior engineering review.
- Explain risk-based delivery separation.
- Explain blended delivery only as a case-by-case option for lower-sensitivity
  work.
- Avoid the terms "outsourcing to China", "discount labor", or equivalent
  wording.

Verification:

- Chinese copy review passes.
- Fact statements about domestic execution capability are confirmed.
- No claim implies a larger team, legal entity, certification, partnership, or
  compliance guarantee than actually exists.
- Sensitive-content search passes.

## Rollback Points

- M1 rollback: revert the PR that adds `index.html` and related assets.
- M2 rollback: disable or revert the Pages workflow PR.
- M3 rollback: revert the imported content PR.
- M4 rollback: revert the content replacement PR.
- M5 rollback: revert the Chinese delivery model page PR.

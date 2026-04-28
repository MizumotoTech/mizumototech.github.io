# Terraform Foundation Baseline (GCP Example)

## Purpose

This example provides a minimal, reusable Terraform baseline for `dev`,
`stg`, and `prd` environments on GCP.

The current module intentionally does not create real cloud resources.
It focuses on structure, variable flow, and safe execution workflow, so teams
can extend it without starting from ad-hoc scripts.

## What This Example Covers

- Multi-environment layout (`dev` / `stg` / `prd`)
- Shared local module for baseline inputs and outputs
- Sample variable files with placeholder values
- Repeatable `init` / `validate` command path
- Destroy and rollback notes for future resource additions

## Repository Structure

```text
examples/gcp/terraform-foundation-baseline/
├── .gitignore
├── README.md
├── modules/
│   └── env-baseline/
│       ├── main.tf
│       ├── outputs.tf
│       └── variables.tf
└── envs/
    ├── dev/
    │   ├── main.tf
    │   ├── terraform.tfvars.example
    │   └── variables.tf
    ├── stg/
    │   ├── main.tf
    │   ├── terraform.tfvars.example
    │   └── variables.tf
    └── prd/
        ├── main.tf
        ├── terraform.tfvars.example
        └── variables.tf
```

## Prerequisites

- Terraform `>= 1.6.0` (locally verified with `v1.10.3` on `2026-04-24`)
- Shell environment with standard POSIX utilities
- Access to target GCP projects is not required for this no-resource baseline
- Access to target GCP projects is required after real resources or providers
  are added
- Agreement on environment-to-project mapping before any mutating run

## Sample Variables

Each environment includes `terraform.tfvars.example`.

Required variables:

- `project_id`: GCP project ID placeholder for that environment
- `region`: primary region placeholder

Optional variables:

- `labels`: map of extra labels merged into baseline labels
- `environment`: defaults are pre-set (`dev`, `stg`, `prd`)

## Validation Path

Run the commands below from the root of this portfolio repository.

If you use this example as a standalone directory, first enter its root:

```bash
cd terraform-foundation-baseline
```

Within this repository, use:

```bash
cd examples/gcp/terraform-foundation-baseline
```

- Step 1: Prepare local variable files (mutating local files).

```bash
cp envs/dev/terraform.tfvars.example envs/dev/terraform.tfvars
cp envs/stg/terraform.tfvars.example envs/stg/terraform.tfvars
cp envs/prd/terraform.tfvars.example envs/prd/terraform.tfvars
```

- Step 2: Initialize Terraform per environment.
- Note: cloud is read-only in this step; local directory is mutated.

```bash
terraform -chdir=envs/dev init -backend=false
terraform -chdir=envs/stg init -backend=false
terraform -chdir=envs/prd init -backend=false
```

- Step 3: Validate per environment (read-only).

```bash
terraform -chdir=envs/dev validate
terraform -chdir=envs/stg validate
terraform -chdir=envs/prd validate
```

Validation status:

- `terraform validate` passed locally for `dev`, `stg`, and `prd` on
  `2026-04-24` with Terraform `v1.10.3`.

## Sample Promotion Path for Future Resource Additions

Use this sequence only after provider and resource modules are added.

- Step 1: Execute `dev` first.

```bash
terraform -chdir=envs/dev plan -out=tfplan
terraform -chdir=envs/dev apply tfplan
```

- Step 2: Promote to `stg` only after `dev` review.

```bash
terraform -chdir=envs/stg plan -out=tfplan
terraform -chdir=envs/stg apply tfplan
```

- Step 3: Promote to `prd` with explicit approval gate.

```bash
terraform -chdir=envs/prd plan -out=tfplan
terraform -chdir=envs/prd apply tfplan
```

Stop condition:

- If plan output includes unexpected create or destroy actions, stop and
  re-check variable files, module changes, and target environment mapping.

## Destroy and Rollback Notes

For this baseline, destroy is expected to be no-op because no resources are
created by default.

If you add real resources later, use explicit destroy by environment:

```bash
terraform -chdir=envs/dev destroy
terraform -chdir=envs/stg destroy
terraform -chdir=envs/prd destroy
```

Rollback approach:

- Prefer restoring previous module or variable commit, then re-run `plan`.
- Do not run `apply` until plan diff matches expected rollback intent.

## Current Limitations

- This example does not configure a GCP provider.
- This example does not create remote state buckets.
- This example does not create IAM, network, or runtime resources.
- This example is a structure and workflow baseline, not a production landing
  zone.

## Extension Ideas

- Add GCS remote state backend per environment.
- Add baseline service account and IAM module.
- Add Artifact Registry bootstrap module.
- Add CI/CD validation workflow for `fmt`, `validate`, and `plan`.
- Add policy checks before production apply.

## Sanitization Notes

- All project IDs are placeholders.
- No credentials, tokens, or private endpoints are included.
- Replace placeholders with organization values only in private context.

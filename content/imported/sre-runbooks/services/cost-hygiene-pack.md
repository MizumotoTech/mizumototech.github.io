# Cost Hygiene Pack

## Summary

This pack gives small GCP teams a practical cost hygiene baseline, so cloud
spend is easier to see, easier to control, and safer to optimize without
service risk.

## Problem This Solves

- Cloud spend increases without clear ownership or prioritization.
- Idle or overprovisioned resources are not reviewed consistently.
- Teams lack a repeatable workflow for cost checks and cleanup decisions.
- Cost optimization work is ad hoc and hard to hand over.

## Ideal Client Profile

- Small to mid-size product teams on GCP.
- Teams with active cloud workloads and rising monthly spend.
- Teams that need practical optimization before deeper FinOps programs.

## Scope

- Cost baseline mapping for scoped projects and environments.
- Tag and label hygiene review for ownership and allocation visibility.
- Budget threshold and alerting baseline design.
- Waste candidate shortlist with risk notes and cleanup sequencing.
- Handover documentation for recurring cost hygiene operations.

## Implementation Boundary

- This pack focuses on baseline visibility, control, and prioritized actions.
- Full cost governance transformation is not assumed unless explicitly scoped.
- Contract or pricing model renegotiation is follow-up work.
- Implementation beyond agreed cleanup candidates is excluded from phase 1.

## Non-goals

- Full FinOps organization and chargeback redesign.
- Procurement or contract negotiation support.
- Deep architecture replatforming only for cost reasons.
- Accounting-grade cost allocation or financial reporting redesign.
- 24x7 managed cost operations service.

## Inputs Required from Client

- Billing account and scoped project inventory context.
- Existing budget, label, and ownership conventions.
- Access to relevant billing export or reporting views.
- Current constraints for production-safe optimization changes.

## Client Responsibilities

- Provide required billing and project access within agreed timelines.
- Confirm ownership mapping and prioritization criteria during reviews.
- Assign at least one reviewer for change risk decisions.
- Review and sign off the handover package in the agreed timeline.

## Deliverables

### Documentation Deliverables

1. Cost hygiene baseline assessment summary.
2. Tagged and untagged spend visibility guideline.
3. Budget threshold and alerting recommendation.
4. Risk-aware cleanup and optimization playbook.
5. Handover guide for recurring cost hygiene operation.

### Baseline Technical Deliverables

1. Scoped cost driver breakdown for recent billing periods.
2. Label coverage snapshot and ownership gap list.
3. Prioritized optimization candidate list with directional impact range.
4. Rollback-aware implementation sequence for approved actions.

## Handover Deliverables

- Weekly and monthly cost review checklist.
- Decision checkpoints for optimization versus risk.
- Rollback and stop conditions for mutating cost actions.
- Known limitations and follow-up backlog.

## Acceptance Criteria

1. Scoped projects, environments, and ownership boundaries are documented.
2. Baseline spend visibility includes top cost drivers and ownership signals.
3. Budget threshold proposal includes explicit alerting path and owners.
4. Prioritized candidate list includes directional impact and risk notes.
5. Mutating optimization steps include stop conditions and rollback guidance.
6. A designated engineer can run the documented weekly review and prepare a
   safe optimization proposal using only the handover package and without
   undocumented verbal steps.

## Assumptions

- Billing and project access can be provided in agreed timelines.
- Teams can confirm optimization ownership and risk tolerance.
- Baseline production stability requirements are known for scoped services.

## Risks and Constraints

- Missing labels or ownership data can reduce allocation accuracy.
- Delayed access to billing data may block baseline completeness.
- Hidden service dependencies can limit optimization candidates.

## Exclusions

- Guaranteed cost reduction commitments.
- Organization-wide policy enforcement rollout.
- Any change requiring application redesign.

## Pricing Model Placeholder

- Preferred model: fixed-scope package with milestone-based payment.
- Optional extension: time-boxed implementation and validation block.
- Final pricing: TBD after discovery and scope confirmation.

Illustrative milestones:

1. Discovery and spend baseline mapping.
2. Candidate prioritization and risk review.
3. Handover package delivery and sign-off.

## Success Signals

- Teams can identify and prioritize top cost drivers quickly.
- Budget and ownership visibility is no longer fragmented.
- Optimization actions are executed with explicit rollback control.
- Day-2 owners can continue recurring cost hygiene independently.

## Optional Add-ons

- Terraform Foundation Pack integration.
- CI/CD cost visibility or policy check integration.
- Architecture Review Pack follow-up.

## Related Packs

- Terraform Foundation Pack
- Architecture Review Pack

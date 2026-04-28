# Handover Template

Use this template for project-to-operations handover.
The goal is independent day-2 operation without undocumented verbal steps.

## Metadata

- Title: [Handover package title]
- Service/System: [System name]
- Environment(s): [dev/stg/prd]
- Repository/Location: [Repository or document link]
- Owner role: [Role, not a personal name]
- Handover date: [YYYY-MM-DD]
- Last reviewed date: [YYYY-MM-DD]

## Summary

Describe what is being handed over, to whom, and what "ready for operation"
means for this package.

## Scope and Non-goals

### Scope

- [In-scope item 1]
- [In-scope item 2]
- [In-scope item 3]

### Non-goals

- [Out-of-scope item 1]
- [Out-of-scope item 2]
- [Out-of-scope item 3]

## System Context and Dependencies

- Architecture summary: [short description + diagram link if available]
- Critical dependencies: [databases, queues, external APIs, etc.]
- Upstream/downstream impact notes: [who is affected by failure]

## Access and Prerequisites

- Required roles and permissions:
  - [Role 1]
  - [Role 2]
- Required tools:
  - [CLI/tool 1 and version]
  - [CLI/tool 2 and version]
- Required references:
  - [Runbook link]
  - [Design/ADR link]

## Standard Operations

### Read-only Checks

```bash
# [Read-only] Health/status check command
```

### Routine Mutating Operations

1. [Operation name]

   Command:

   ```bash
   # [Mutating] <command>
   ```

   Stop condition: [When to stop]

   Rollback:

   ```bash
   # [Mutating][Rollback] <rollback command>
   ```

2. [Operation name]

   Command:

   ```bash
   # [Mutating] <command>
   ```

   Stop condition: [When to stop]

   Rollback:

   ```bash
   # [Mutating][Rollback] <rollback command>
   ```

### Validation After Operation

- [Expected healthy state 1]
- [Expected healthy state 2]
- [Metric/log/query to confirm]

## Release and Change Control

- Deployment gate policy: [who approves what and when]
- Change window: [allowed windows and freeze periods]
- Required validation after change:
  - [Validation check 1]
  - [Validation check 2]

## Support and Escalation Path

- Primary support role: [Role]
- Secondary backup role: [Role]
- Escalation trigger examples:
  - [Trigger 1 with measurable threshold]
  - [Trigger 2 with measurable threshold]
- Support communication channel: [Channel name]

## Known Risks and Open Items

- [Known risk 1 and mitigation status]
- [Known risk 2 and mitigation status]
- [Open backlog item and owner]

## 30-Day Stabilization Plan

1. Week 1: [Goal and checks]
2. Week 2: [Goal and checks]
3. Week 3: [Goal and checks]
4. Week 4: [Goal and checks]

## Acceptance and Sign-off

- Handover walkthrough completed: [Yes/No]
- Independent operation simulation completed: [Yes/No]
- Remaining blockers: [List or None]
- Sign-off date: [YYYY-MM-DD]
- Sign-off roles:
  - Delivery owner: [Role]
  - Receiving owner: [Role]

# Runbook Template

Use this template for operational incident runbooks.
Keep every step evidence-based, reversible, and safe to execute.

## Metadata

- Title: [Runbook title]
- Service/System: [System name]
- Environment: [dev/stg/prd]
- Severity hint: [SEV2/SEV1]
- Owner role: [Role, not a personal name]
- Last reviewed date: [YYYY-MM-DD]
- Estimated MTTR target: [for example: 45 minutes]
- Primary evidence link: [Dashboard, log query, or monitoring view]

## Symptoms

- [Alert name and threshold]
- [Observed error pattern]
- [Observed service behavior]

## Impact Assessment

- User impact: [Who is affected and how]
- Business impact: [Revenue/operations/compliance impact]
- Blast radius: [Scope by service, region, or environment]
- Current severity decision: [SEV level and rationale]

## First Actions

1. Open or update the incident/support channel and assign the current driver.
2. Capture start timestamp and initial hypothesis.
3. Run quick read-only checks to confirm current system state.

### Read-only Commands

```bash
# [Read-only] Replace placeholders before running.
kubectl -n <namespace> get pods
kubectl -n <namespace> get events --sort-by=.lastTimestamp | tail -n 20
```

## Actions to Avoid

- Do not run undocumented destructive cleanup commands.
- Do not apply configuration and infrastructure changes together.
- Do not rotate credentials unless credential compromise is confirmed.
- Do not restart or scale production components before confirming impact and
  rollback path.
- Do not bypass production approval or escalation gates.

## Triage Path

1. Metrics query (read-only):

   ```bash
   # [Read-only] Replace with your monitoring query.
   # sum(rate(http_requests_total{service="<service>",status=~"5.."}[5m]))
   ```

2. Log query (read-only):

   ```bash
   # [Read-only] Replace with your logging query.
   # resource.type="k8s_container" severity>=ERROR labels.app="<service>"
   ```

3. Decision branch:

   - If error rate recovers naturally, continue observation for 15 minutes.
   - If errors persist and blast radius grows, go to `Mitigation Steps`.
   - If user-facing impact exceeds threshold, go to `Escalation Conditions`.

## Mitigation Steps

1. [Mitigation step 1 in time order]

   Command:

   ```bash
   # [Mutating] <command>
   ```

   Stop condition: [When to halt and reassess]

   Rollback:

   ```bash
   # [Mutating][Rollback] <rollback command>
   ```

2. [Mitigation step 2 in time order]

   Command:

   ```bash
   # [Mutating] <command>
   ```

   Stop condition: [When to halt and reassess]

   Rollback:

   ```bash
   # [Mutating][Rollback] <rollback command>
   ```

## Escalation Conditions

- [Measurable threshold 1, for example: error rate > 5% for 10 minutes]
- [Measurable threshold 2, for example: data integrity risk detected]
- [Measurable threshold 3, for example: no mitigation progress after 30 minutes]

Escalate to:

- Primary role: [Role]
- Secondary role: [Role]
- Management notification trigger: [Condition]

## Post-Incident Follow-up

- Capture incident timeline and key decisions within 24 hours.
- Record confirmed root cause and contributing factors.
- Create follow-up actions with owners and due dates.
- Update this runbook if any step was missing or unclear.

## Automation Opportunities

- [Candidate automation 1, for example: auto-detect symptom pattern]
- [Candidate automation 2, for example: pre-flight safety check]
- [Candidate automation 3, for example: rollback guardrail script]

# Runbook Template

用于编写运维故障 Runbook 模板。
所有步骤应可追溯、可回滚、可安全执行。

## 元数据

- Title: [Runbook 标题]
- Service/System: [系统名称]
- Environment: [dev/stg/prd]
- Severity hint: [SEV2/SEV1]
- Owner role: [角色名称，不使用个人姓名]
- Last reviewed date: [YYYY-MM-DD]
- Estimated MTTR target: [例如：45 minutes]
- Primary evidence link: [Dashboard、日志查询或监控视图]

## Symptoms

- [告警名称与阈值]
- [可观测错误现象]
- [服务行为异常现象]

## Impact Assessment

- User impact: [影响了谁，影响方式]
- Business impact: [对收入/运营/合规的影响]
- Blast radius: [按服务、区域或环境描述范围]
- Current severity decision: [SEV 级别与判断依据]

## First Actions

1. 建立或更新 incident/support 协作渠道并明确当前负责人。
2. 记录开始时间与初始假设。
3. 先执行只读检查确认当前系统状态。

### Read-only Commands

```bash
# [Read-only] 执行前请替换占位符。
kubectl -n <namespace> get pods
kubectl -n <namespace> get events --sort-by=.lastTimestamp | tail -n 20
```

## Actions to Avoid

- 不要执行未在文档中定义的破坏性清理动作。
- 不要在同一步同时改配置与改基础设施。
- 未确认凭据泄露前，不要直接轮换凭据。
- 未确认影响范围与回滚路径前，不要直接重启或扩缩容生产组件。
- 不要跳过生产审批或升级门禁。

## Triage Path

1. 指标查询（只读）：

   ```bash
   # [Read-only] 请替换为你的监控查询语句。
   # sum(rate(http_requests_total{service="<service>",status=~"5.."}[5m]))
   ```

2. 日志查询（只读）：

   ```bash
   # [Read-only] 请替换为你的日志查询语句。
   # resource.type="k8s_container" severity>=ERROR labels.app="<service>"
   ```

3. 分支判断：

   - 若错误率自然恢复，继续观察 15 分钟。
   - 若错误持续且影响扩大，进入 `Mitigation Steps`。
   - 若用户影响超过阈值，进入 `Escalation Conditions`。

## Mitigation Steps

1. [按时间顺序填写缓解步骤 1]

   Command:

   ```bash
   # [Mutating] <command>
   ```

   Stop condition: [达到什么条件必须停止并重新评估]

   Rollback:

   ```bash
   # [Mutating][Rollback] <rollback command>
   ```

2. [按时间顺序填写缓解步骤 2]

   Command:

   ```bash
   # [Mutating] <command>
   ```

   Stop condition: [达到什么条件必须停止并重新评估]

   Rollback:

   ```bash
   # [Mutating][Rollback] <rollback command>
   ```

## Escalation Conditions

- [可度量阈值 1，例如：error rate > 5% 且持续 10 分钟]
- [可度量阈值 2，例如：发现数据一致性风险]
- [可度量阈值 3，例如：30 分钟内缓解无进展]

Escalate to:

- Primary role: [角色]
- Secondary role: [角色]
- Management notification trigger: [触发条件]

## Post-Incident Follow-up

- 24 小时内补全事故时间线和关键决策。
- 记录已确认根因与促成因素。
- 输出后续行动项并标注 owner 与截止时间。
- 若本 Runbook 有缺失步骤，立即更新。

## Automation Opportunities

- [自动化候选 1，例如：症状自动识别]
- [自动化候选 2，例如：执行前安全检查]
- [自动化候选 3，例如：回滚护栏脚本]

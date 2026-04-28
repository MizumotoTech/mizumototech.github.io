# Handover Template

用于项目向运维侧交接的模板。
目标是让接手团队在无未文档化口头步骤的前提下独立完成 day-2 运维。

## 元数据

- Title: [交接包标题]
- Service/System: [系统名称]
- Environment(s): [dev/stg/prd]
- Repository/Location: [仓库或文档链接]
- Owner role: [角色名称，不使用个人姓名]
- Handover date: [YYYY-MM-DD]
- Last reviewed date: [YYYY-MM-DD]

## 摘要

说明本次交接的对象、接收方，以及该交接包达到何种条件可视为
"可独立运维"。

## 范围与非目标

### 范围

- [范围项 1]
- [范围项 2]
- [范围项 3]

### 非目标

- [非范围项 1]
- [非范围项 2]
- [非范围项 3]

## 系统上下文与依赖

- 架构摘要：[简述 + 架构图链接（如有）]
- 关键依赖：[数据库、队列、外部 API 等]
- 上下游影响说明：[故障影响哪些系统或团队]

## 访问与前置条件

- 所需角色与权限：
  - [角色 1]
  - [角色 2]
- 所需工具：
  - [CLI/工具 1 与版本]
  - [CLI/工具 2 与版本]
- 所需参考资料：
  - [Runbook 链接]
  - [Design/ADR 链接]

## 标准操作

### Read-only Checks

```bash
# [Read-only] 健康状态检查命令
```

### Routine Mutating Operations

1. [操作名称]

   Command:

   ```bash
   # [Mutating] <command>
   ```

   Stop condition: [达到什么条件必须停止]

   Rollback:

   ```bash
   # [Mutating][Rollback] <rollback command>
   ```

2. [操作名称]

   Command:

   ```bash
   # [Mutating] <command>
   ```

   Stop condition: [达到什么条件必须停止]

   Rollback:

   ```bash
   # [Mutating][Rollback] <rollback command>
   ```

### Validation After Operation

- [预期健康状态 1]
- [预期健康状态 2]
- [用于确认的指标/日志/查询]

## 发布与变更控制

- 发布门禁规则：[谁在何时审批什么]
- 变更窗口：[允许窗口与冻结期]
- 变更后必做校验：
  - [校验项 1]
  - [校验项 2]

## 支持与升级路径

- 一级支持角色：[角色]
- 二级备援角色：[角色]
- 升级触发示例：
  - [触发条件 1，需可度量]
  - [触发条件 2，需可度量]
- 支持沟通渠道：[渠道名称]

## 已知风险与未决事项

- [已知风险 1 与当前缓解状态]
- [已知风险 2 与当前缓解状态]
- [未决 backlog 项与 owner]

## 30 天稳定化计划

1. 第 1 周：[目标与检查项]
2. 第 2 周：[目标与检查项]
3. 第 3 周：[目标与检查项]
4. 第 4 周：[目标与检查项]

## 验收与签收

- 交接讲解是否完成：[Yes/No]
- 独立运维演练是否完成：[Yes/No]
- 剩余阻塞项：[列表或 None]
- 签收日期：[YYYY-MM-DD]
- 签收角色：
  - 交付方 owner：[角色]
  - 接收方 owner：[角色]

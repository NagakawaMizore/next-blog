贡献指南
========

工作流程
--------

1. 先判断变更属于哪个子系统。
2. 阅读相邻实现和测试。
3. 确认变更是否影响运行时行为、schema、UI、文档或运维流程。
4. 保持 patch 聚焦，不做无关重构。

提交信息
--------

推荐格式：

.. code-block:: text

   <type>(<scope>): <short summary>

常用类型包括 ``build``、``ci``、``docs``、``feat``、``fix``、``perf``、``refactor`` 和 ``test``。摘要使用祈使句、现在时，不以句号结尾。

代码完整性
----------

* 发布版本时优先使用签名 commit 和签名 tag。
* 不提交密钥、本地数据库状态或构建产物。
* 依赖变更应和源代码变更一样认真审查。
* 非平凡变更应在分支上开发，并通过测试和文档构建。

提交前检查
----------

.. code-block:: bash

   pnpm lint
   pnpm test
   make -C Documentation html

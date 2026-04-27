运维
====

环境配置
--------

关键环境变量在 ``src/env.js`` 中校验：

.. list-table::
   :header-rows: 1
   :widths: 34 44

   * - 变量
     - 用途
   * - ``DATABASE_URL``
     - PostgreSQL 连接字符串。
   * - ``RESEND_API_KEY``
     - Resend API key。
   * - ``RESEND_AUDIENCE_ID``
     - Resend audience ID。
   * - ``EMAIL_FROM``
     - 发件邮箱。
   * - ``BETTER_AUTH_SECRET``
     - better-auth secret，生产环境必填。
   * - ``GOOGLE_CLIENT_ID`` / ``GOOGLE_CLIENT_SECRET``
     - Google OAuth 凭据。
   * - ``GITHUB_CLIENT_ID`` / ``GITHUB_CLIENT_SECRET``
     - GitHub OAuth 凭据。

数据库流程
----------

Payload collection 变更：

.. code-block:: bash

   pnpm payload:migrate:create
   pnpm payload:migrate
   pnpm payload:generate

应用 schema 变更：

.. code-block:: bash

   pnpm db:generate
   pnpm db:migrate

质量检查
--------

.. code-block:: bash

   pnpm lint
   pnpm check
   pnpm test
   pnpm build

文档构建
--------

.. code-block:: bash

   make -C Documentation html

生成的 ``Documentation/build`` 不应提交。

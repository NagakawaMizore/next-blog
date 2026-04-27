維運
====

環境設定
--------

關鍵環境變數在 ``src/env.js`` 中驗證：

.. list-table::
   :header-rows: 1
   :widths: 34 44

   * - 變數
     - 用途
   * - ``DATABASE_URL``
     - PostgreSQL 連線字串。
   * - ``RESEND_API_KEY``
     - Resend API key。
   * - ``RESEND_AUDIENCE_ID``
     - Resend audience ID。
   * - ``EMAIL_FROM``
     - 寄件信箱。
   * - ``BETTER_AUTH_SECRET``
     - better-auth secret，正式環境必填。
   * - ``GOOGLE_CLIENT_ID`` / ``GOOGLE_CLIENT_SECRET``
     - Google OAuth 憑證。
   * - ``GITHUB_CLIENT_ID`` / ``GITHUB_CLIENT_SECRET``
     - GitHub OAuth 憑證。

資料庫流程
----------

Payload collection 變更：

.. code-block:: bash

   pnpm payload:migrate:create
   pnpm payload:migrate
   pnpm payload:generate

應用 schema 變更：

.. code-block:: bash

   pnpm db:generate
   pnpm db:migrate

品質檢查
--------

.. code-block:: bash

   pnpm lint
   pnpm check
   pnpm test
   pnpm build

文件建置
--------

.. code-block:: bash

   make -C Documentation html

產生的 ``Documentation/build`` 不應提交。

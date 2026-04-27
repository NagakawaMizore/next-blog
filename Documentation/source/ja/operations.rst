運用
====

環境設定
--------

主要な環境変数は ``src/env.js`` で検証されます。

.. list-table::
   :header-rows: 1
   :widths: 34 44

   * - 変数
     - 用途
   * - ``DATABASE_URL``
     - PostgreSQL 接続文字列。
   * - ``RESEND_API_KEY``
     - Resend API key。
   * - ``RESEND_AUDIENCE_ID``
     - Resend audience ID。
   * - ``EMAIL_FROM``
     - 送信元メールアドレス。
   * - ``BETTER_AUTH_SECRET``
     - better-auth secret。本番では必須。
   * - ``GOOGLE_CLIENT_ID`` / ``GOOGLE_CLIENT_SECRET``
     - Google OAuth 認証情報。
   * - ``GITHUB_CLIENT_ID`` / ``GITHUB_CLIENT_SECRET``
     - GitHub OAuth 認証情報。

データベース手順
----------------

Payload collection の変更:

.. code-block:: bash

   pnpm payload:migrate:create
   pnpm payload:migrate
   pnpm payload:generate

アプリケーション schema の変更:

.. code-block:: bash

   pnpm db:generate
   pnpm db:migrate

品質チェック
------------

.. code-block:: bash

   pnpm lint
   pnpm check
   pnpm test
   pnpm build

ドキュメントビルド
------------------

.. code-block:: bash

   make -C Documentation html

生成される ``Documentation/build`` はコミットしません。

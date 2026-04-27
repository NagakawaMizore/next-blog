はじめに
========

このページでは、ローカル開発の基本手順を説明します。依存関係、環境変数、データベース、アプリケーション起動、ドキュメントビルドを扱います。

必要なツール
------------

次のツールを用意してください。

* Next.js 15 に対応した Node.js;
* pnpm 10.x;
* ローカル PostgreSQL 用の Docker または Podman;
* Git;
* 任意: Sphinx。

環境変数
--------

サンプルをコピーします。

.. code-block:: bash

   cp .env.example .env

環境変数は ``src/env.js`` で ``@t3-oss/env-nextjs`` と ``zod`` により検証されます。ローカル UI やドキュメント確認だけであれば ``SKIP_ENV_VALIDATION=1`` を一時的に使えますが、本番では使わないでください。

データベース
------------

ローカル PostgreSQL を起動します。

.. code-block:: bash

   ./start-database.sh

必要に応じて次を実行します。

.. code-block:: bash

   pnpm payload:migrate
   pnpm db:push

アプリケーション起動
--------------------

.. code-block:: bash

   pnpm install
   pnpm dev

公開サイトは通常 ``http://localhost:3000``、Payload 管理画面は ``/admin`` です。

よく使うチェック
----------------

.. list-table::
   :header-rows: 1
   :widths: 24 50

   * - コマンド
     - 目的
   * - ``pnpm lint``
     - コンテンツリンク検証と Biome lint。
   * - ``pnpm check``
     - Biome チェック。
   * - ``pnpm test``
     - Vitest テスト。
   * - ``pnpm build``
     - Next.js アプリケーションのビルドとサイトマップ生成。
   * - ``make -C Documentation html``
     - Sphinx ドキュメントのビルド。

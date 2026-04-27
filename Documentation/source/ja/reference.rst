リファレンス
============

よく使うコマンド
----------------

.. list-table::
   :header-rows: 1
   :widths: 26 50

   * - コマンド
     - 説明
   * - ``pnpm dev``
     - 開発サーバーを起動する。
   * - ``pnpm build``
     - 本番アプリケーションをビルドする。
   * - ``pnpm lint``
     - コンテンツリンク検証と Biome lint を実行する。
   * - ``pnpm test``
     - テストを実行する。
   * - ``pnpm db:migrate``
     - Drizzle migration を適用する。
   * - ``pnpm payload:generate``
     - Payload TypeScript 型を生成する。

ルート
------

.. code-block:: text

   /
   /posts
   /posts/[slug]
   /tags
   /tags/[tag]
   /about
   /login
   /admin
   /api/auth/[...all]
   /api/comments/[...comment]
   /api/search
   /rss.xml

用語
----

Payload
   記事、ユーザー、メディア、管理画面を扱う CMS。

Drizzle
   アプリケーション所有のデータベーステーブルを扱う TypeScript ORM。

better-auth
   OAuth とセッションを提供する認証ライブラリ。

BlogPost
   ``src/lib/payload-posts.ts`` が返すフロントエンド向けの正規化済み記事構造。

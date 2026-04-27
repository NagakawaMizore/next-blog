參考
====

常用命令
--------

.. list-table::
   :header-rows: 1
   :widths: 26 50

   * - 命令
     - 說明
   * - ``pnpm dev``
     - 啟動開發伺服器。
   * - ``pnpm build``
     - 建置正式應用。
   * - ``pnpm lint``
     - 執行內容連結驗證和 Biome lint。
   * - ``pnpm test``
     - 執行測試。
   * - ``pnpm db:migrate``
     - 套用 Drizzle 遷移。
   * - ``pnpm payload:generate``
     - 產生 Payload TypeScript 型別。

路由
----

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

術語
----

Payload
   管理文章、使用者、媒體和後台介面的 CMS。

Drizzle
   管理應用自有資料庫表的 TypeScript ORM。

better-auth
   提供 OAuth 和 Session 能力的認證庫。

BlogPost
   ``src/lib/payload-posts.ts`` 回傳的前端正規化文章結構。

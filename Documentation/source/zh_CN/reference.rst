参考
====

常用命令
--------

.. list-table::
   :header-rows: 1
   :widths: 26 50

   * - 命令
     - 说明
   * - ``pnpm dev``
     - 启动开发服务器。
   * - ``pnpm build``
     - 构建生产应用。
   * - ``pnpm lint``
     - 运行内容链接校验和 Biome lint。
   * - ``pnpm test``
     - 运行测试。
   * - ``pnpm db:migrate``
     - 应用 Drizzle 迁移。
   * - ``pnpm payload:generate``
     - 生成 Payload TypeScript 类型。

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

术语
----

Payload
   管理文章、用户、媒体和后台界面的 CMS。

Drizzle
   管理应用自有数据库表的 TypeScript ORM。

better-auth
   提供 OAuth 和会话能力的认证库。

BlogPost
   ``src/lib/payload-posts.ts`` 返回的前端规范化文章结构。

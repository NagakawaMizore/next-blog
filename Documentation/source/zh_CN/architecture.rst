架构
====

分层视图
--------

.. list-table::
   :header-rows: 1
   :widths: 22 34 44

   * - 层
     - 主要文件
     - 职责
   * - 展示层
     - ``src/app/(main)``、``src/components``
     - 渲染公开页面、路由处理器、共享 UI、富文本和布局。
   * - 内容访问层
     - ``src/lib/payload-posts.ts``
     - 查询 Payload，并把 CMS 文档规范化为前端可用的数据结构。
   * - CMS 后台
     - ``payload.config.ts``、``src/payload``
     - 定义内容集合并提供后台管理体验。
   * - 认证与评论
     - ``src/server/auth``、``src/server/comments``
     - 处理 OAuth、会话、评论存储和评论权限。
   * - 数据层
     - ``src/server/db``、``src/migrations``
     - 管理 Drizzle schema、数据库连接和应用迁移。

文章读取流程
------------

1. ``/posts/[slug]`` 页面接收文章 slug。
2. Server Component 调用 ``getPostBySlug``。
3. ``src/lib/payload-posts.ts`` 获取 Payload client 并查询 ``published`` 状态的文章。
4. 原始 Payload 文档被转换为 ``BlogPost``。
5. 页面渲染富文本，并挂载分享、评论等交互。

数据边界
--------

Payload 负责编辑内容和媒体元数据；应用层负责认证、评论、路由行为、UI 状态和集成逻辑。新增功能前应先判断数据归属：编辑内容放入 Payload collection；账号、互动、审核和运营记录放入 Drizzle schema。

已知风险
--------

* 生产环境不应使用 Payload secret 默认值。
* RSS 路径应统一为 ``/rss.xml``。
* 标签统计和搜索索引当前依赖批量读取，内容规模变大后应引入缓存或数据库侧聚合。
* 评论角色策略需要更明确的服务端规则和测试覆盖。

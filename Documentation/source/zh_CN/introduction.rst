项目介绍
========

Next Blog 是一个以阅读体验为核心的全栈博客平台。它使用 Next.js App Router 构建公开站点，使用 Payload CMS 管理内容，并通过 PostgreSQL、Drizzle ORM、better-auth 和 Fuma Comments 提供认证、评论与应用数据能力。

产品范围
--------

当前项目聚焦在以下能力：

* 通过 Payload CMS 创建、编辑、发布文章；
* 渲染首页、文章列表、文章详情、标签页和个人页面；
* 通过 Google 与 GitHub OAuth 登录；
* 为登录用户提供评论功能；
* 输出搜索索引、RSS、站点地图、JSON-LD 和 Open Graph 图片；
* 提供 Newsletter 表单与 React Email 模板。

这个项目不是通用社区 CMS，而是一个受控的个人发布系统：公开侧重阅读，后台侧重内容管理。

核心角色
--------

.. list-table::
   :header-rows: 1
   :widths: 20 34 36

   * - 角色
     - 目标
     - 主要入口
   * - 访客
     - 浏览和阅读内容。
     - ``/``、``/posts``、``/posts/[slug]``、``/tags``
   * - 回访读者
     - 通过标签筛选内容并订阅读者入口。
     - ``/tags/[tag]``、``/rss.xml``
   * - 登录用户
     - 发表评论和使用账号相关操作。
     - ``/login``、``/posts/[slug]``
   * - 内容管理员
     - 维护、排期和发布内容。
     - ``/admin``

文档定位
--------

``Documentation/source`` 是本项目正式的 Sphinx 文档源目录。``docs/`` 中的 Markdown 文件可以继续作为调研或草稿材料，但稳定的工程文档应整理为 reStructuredText 后进入本目录。

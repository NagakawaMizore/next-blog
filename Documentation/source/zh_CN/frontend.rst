前端
====

页面职责
--------

.. list-table::
   :header-rows: 1
   :widths: 22 34 44

   * - 路由
     - 主要文件
     - 职责
   * - ``/``
     - ``src/app/(main)/(home)/page.tsx``
     - 首页，包含 Hero、最新文章和 Newsletter CTA。
   * - ``/posts``
     - ``src/app/(main)/(home)/posts/page.tsx``
     - 已发布文章的分页列表。
   * - ``/posts/[slug]``
     - ``src/app/(main)/(home)/posts/[slug]/page.tsx``
     - 文章详情、富文本、元数据、分享和评论。
   * - ``/tags``
     - ``src/app/(main)/(home)/tags/page.tsx``
     - 标签索引与文章数量。
   * - ``/tags/[tag]``
     - ``src/app/(main)/(home)/tags/[...slug]/page.tsx``
     - 按标签筛选的文章列表。
   * - ``/login``
     - ``src/app/(main)/(auth)/login/page.tsx``
     - OAuth 登录入口。

UI 原则
-------

* 阅读优先：排版、行宽和对比度应服务长文阅读。
* 导航轻量：文章、标签、搜索、主题切换和账号入口应容易找到。
* 视觉一致：延续虚线边框、角标和克制动效。
* 跨端一致：移动端和桌面端保持相同信息层级。

组件约定
--------

新增组件前先检查 ``src/components/ui`` 和现有页面组件。共享组件应接收规范化 props，数据获取应放在 Server Component 或 ``src/lib`` helper 中。图标按钮必须有明确的可访问名称。

可访问性
--------

自定义控件要保留键盘焦点；图标按钮和链接需要可读名称；浅色和深色主题都要保持足够对比度；表单必须覆盖空、加载、成功和错误状态。

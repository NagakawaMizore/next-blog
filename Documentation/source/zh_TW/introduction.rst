專案介紹
========

Next Blog 是一個以閱讀體驗為核心的全端部落格平台。它使用 Next.js App Router 建置公開站台，使用 Payload CMS 管理內容，並透過 PostgreSQL、Drizzle ORM、better-auth 與 Fuma Comments 提供認證、留言與應用資料能力。

產品範圍
--------

目前專案聚焦於以下能力：

* 透過 Payload CMS 建立、編輯、發布文章；
* 呈現首頁、文章列表、文章詳情、標籤頁與個人頁面；
* 透過 Google 與 GitHub OAuth 登入；
* 為登入使用者提供留言功能；
* 輸出搜尋索引、RSS、網站地圖、JSON-LD 與 Open Graph 圖片；
* 提供 Newsletter 表單與 React Email 範本。

這個專案不是通用社群 CMS，而是一個受控的個人發布系統：公開側重閱讀，後台側重內容管理。

核心角色
--------

.. list-table::
   :header-rows: 1
   :widths: 20 34 36

   * - 角色
     - 目標
     - 主要入口
   * - 訪客
     - 瀏覽和閱讀內容。
     - ``/``、``/posts``、``/posts/[slug]``、``/tags``
   * - 回訪讀者
     - 透過標籤篩選內容並使用訂閱入口。
     - ``/tags/[tag]``、``/rss.xml``
   * - 登入使用者
     - 發表留言與使用帳號相關操作。
     - ``/login``、``/posts/[slug]``
   * - 內容管理員
     - 維護、排程與發布內容。
     - ``/admin``

文件定位
--------

``Documentation/source`` 是本專案正式的 Sphinx 文件來源目錄。``docs/`` 中的 Markdown 檔案可以作為調研或草稿材料，但穩定的工程文件應整理為 reStructuredText 後進入本目錄。

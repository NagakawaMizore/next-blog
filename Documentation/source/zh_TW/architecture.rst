架構
====

分層視圖
--------

.. list-table::
   :header-rows: 1
   :widths: 22 34 44

   * - 層
     - 主要檔案
     - 職責
   * - 展示層
     - ``src/app/(main)``、``src/components``
     - 呈現公開頁面、路由處理器、共用 UI、富文字和版面。
   * - 內容存取層
     - ``src/lib/payload-posts.ts``
     - 查詢 Payload，並把 CMS 文件正規化為前端可用的資料結構。
   * - CMS 後台
     - ``payload.config.ts``、``src/payload``
     - 定義內容集合並提供後台管理體驗。
   * - 認證與留言
     - ``src/server/auth``、``src/server/comments``
     - 處理 OAuth、Session、留言儲存與留言權限。
   * - 資料層
     - ``src/server/db``、``src/migrations``
     - 管理 Drizzle schema、資料庫連線與應用遷移。

文章讀取流程
------------

1. ``/posts/[slug]`` 頁面接收文章 slug。
2. Server Component 呼叫 ``getPostBySlug``。
3. ``src/lib/payload-posts.ts`` 取得 Payload client 並查詢 ``published`` 狀態的文章。
4. 原始 Payload 文件被轉換為 ``BlogPost``。
5. 頁面呈現富文字，並掛載分享、留言等互動。

資料邊界
--------

Payload 負責編輯內容與媒體中繼資料；應用層負責認證、留言、路由行為、UI 狀態與整合邏輯。新增功能前應先判斷資料歸屬：編輯內容放入 Payload collection；帳號、互動、審核與營運記錄放入 Drizzle schema。

已知風險
--------

* 正式環境不應使用 Payload secret 預設值。
* RSS 路徑應統一為 ``/rss.xml``。
* 標籤統計與搜尋索引目前依賴批次讀取，內容規模變大後應引入快取或資料庫側聚合。
* 留言角色策略需要更明確的服務端規則與測試覆蓋。

前端
====

頁面職責
--------

.. list-table::
   :header-rows: 1
   :widths: 22 34 44

   * - 路由
     - 主要檔案
     - 職責
   * - ``/``
     - ``src/app/(main)/(home)/page.tsx``
     - 首頁，包含 Hero、最新文章和 Newsletter CTA。
   * - ``/posts``
     - ``src/app/(main)/(home)/posts/page.tsx``
     - 已發布文章的分頁列表。
   * - ``/posts/[slug]``
     - ``src/app/(main)/(home)/posts/[slug]/page.tsx``
     - 文章詳情、富文字、metadata、分享和留言。
   * - ``/tags``
     - ``src/app/(main)/(home)/tags/page.tsx``
     - 標籤索引與文章數量。
   * - ``/tags/[tag]``
     - ``src/app/(main)/(home)/tags/[...slug]/page.tsx``
     - 按標籤篩選的文章列表。
   * - ``/login``
     - ``src/app/(main)/(auth)/login/page.tsx``
     - OAuth 登入入口。

UI 原則
-------

* 閱讀優先：排版、行寬和對比度應服務長文閱讀。
* 導航輕量：文章、標籤、搜尋、主題切換和帳號入口應容易找到。
* 視覺一致：延續虛線邊框、角標和克制動效。
* 跨端一致：行動端和桌面端保持相同資訊層級。

元件約定
--------

新增元件前先檢查 ``src/components/ui`` 和現有頁面元件。共用元件應接收正規化 props，資料取得應放在 Server Component 或 ``src/lib`` helper 中。圖示按鈕必須有明確的可存取名稱。

可存取性
--------

自訂控制項要保留鍵盤焦點；圖示按鈕和連結需要可讀名稱；淺色和深色主題都要保持足夠對比度；表單必須覆蓋空、載入、成功和錯誤狀態。

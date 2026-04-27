快速開始
========

本頁說明本機開發的基本流程：安裝依賴、準備環境變數、啟動資料庫、執行應用與建置文件。

準備工具
--------

需要安裝：

* Node.js，版本需符合 Next.js 15；
* pnpm 10.x；
* Docker 或 Podman，用於本機 PostgreSQL；
* Git；
* 可選：Sphinx，用於本機建置文件。

環境變數
--------

複製範例檔：

.. code-block:: bash

   cp .env.example .env

環境變數由 ``src/env.js`` 透過 ``@t3-oss/env-nextjs`` 和 ``zod`` 驗證。只做本機 UI 或文件除錯時，可以暫時使用 ``SKIP_ENV_VALIDATION=1``，但正式環境不應依賴它。

資料庫
------

啟動本機 PostgreSQL：

.. code-block:: bash

   ./start-database.sh

資料庫可用後，按需要執行：

.. code-block:: bash

   pnpm payload:migrate
   pnpm db:push

執行專案
--------

.. code-block:: bash

   pnpm install
   pnpm dev

公開站台預設位於 ``http://localhost:3000``，Payload 後台位於 ``/admin``。

常用檢查
--------

.. list-table::
   :header-rows: 1
   :widths: 24 50

   * - 命令
     - 作用
   * - ``pnpm lint``
     - 驗證內容連結並執行 Biome lint。
   * - ``pnpm check``
     - 執行 Biome 檢查。
   * - ``pnpm test``
     - 執行 Vitest 測試。
   * - ``pnpm build``
     - 建置 Next.js 應用並產生網站地圖。
   * - ``make -C Documentation html``
     - 建置 Sphinx 文件。

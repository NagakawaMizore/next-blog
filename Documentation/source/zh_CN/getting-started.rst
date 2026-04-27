快速开始
========

本页说明本地开发的基本流程：安装依赖、准备环境变量、启动数据库、运行应用和构建文档。

准备工具
--------

需要安装：

* Node.js，版本需满足 Next.js 15；
* pnpm 10.x；
* Docker 或 Podman，用于本地 PostgreSQL；
* Git；
* 可选：Sphinx，用于本地构建文档。

环境变量
--------

复制示例文件：

.. code-block:: bash

   cp .env.example .env

环境变量由 ``src/env.js`` 通过 ``@t3-oss/env-nextjs`` 和 ``zod`` 校验。只做本地 UI 或文档调试时，可以临时使用 ``SKIP_ENV_VALIDATION=1``，但生产环境不应依赖它。

数据库
------

启动本地 PostgreSQL：

.. code-block:: bash

   ./start-database.sh

数据库可用后，按需要运行：

.. code-block:: bash

   pnpm payload:migrate
   pnpm db:push

运行项目
--------

.. code-block:: bash

   pnpm install
   pnpm dev

公开站点默认位于 ``http://localhost:3000``，Payload 后台位于 ``/admin``。

常用检查
--------

.. list-table::
   :header-rows: 1
   :widths: 24 50

   * - 命令
     - 作用
   * - ``pnpm lint``
     - 校验内容链接并运行 Biome lint。
   * - ``pnpm check``
     - 运行 Biome 检查。
   * - ``pnpm test``
     - 运行 Vitest 测试。
   * - ``pnpm build``
     - 构建 Next.js 应用并生成站点地图。
   * - ``make -C Documentation html``
     - 构建 Sphinx 文档。

Command Reference
=================

Application
-----------

.. list-table::
   :header-rows: 1
   :widths: 24 52

   * - Command
     - Description
   * - ``pnpm dev``
     - Start the Next.js development server.
   * - ``pnpm build``
     - Build the production application.
   * - ``pnpm start``
     - Start a built production server.
   * - ``pnpm preview``
     - Build and start the production server.

Quality
-------

.. list-table::
   :header-rows: 1
   :widths: 24 52

   * - Command
     - Description
   * - ``pnpm lint``
     - Run project link validation and Biome linting.
   * - ``pnpm check``
     - Run Biome checks.
   * - ``pnpm format``
     - Format files with Biome.
   * - ``pnpm test``
     - Run Vitest once.
   * - ``pnpm test:watch``
     - Run Vitest in watch mode.
   * - ``pnpm test:coverage``
     - Run tests with coverage.

Data and CMS
------------

.. list-table::
   :header-rows: 1
   :widths: 28 48

   * - Command
     - Description
   * - ``pnpm db:generate``
     - Generate Drizzle migration files.
   * - ``pnpm db:migrate``
     - Apply Drizzle migrations.
   * - ``pnpm db:push``
     - Push Drizzle schema changes directly.
   * - ``pnpm db:studio``
     - Open Drizzle Studio.
   * - ``pnpm payload:generate``
     - Generate Payload TypeScript types.
   * - ``pnpm payload:migrate``
     - Run Payload migrations.
   * - ``pnpm payload:migrate:create``
     - Create a Payload migration.

Email
-----

.. list-table::
   :header-rows: 1
   :widths: 24 52

   * - Command
     - Description
   * - ``pnpm email:dev``
     - Start React Email preview server on port 3001.
   * - ``pnpm email:build``
     - Build email templates.
   * - ``pnpm email:export``
     - Export email templates.

Documentation
-------------

.. list-table::
   :header-rows: 1
   :widths: 28 48

   * - Command
     - Description
   * - ``make -C Documentation html``
     - Build Sphinx HTML documentation.
   * - ``make -C Documentation clean``
     - Remove generated Sphinx build output.

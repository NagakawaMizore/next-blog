Getting Started
===============

This page describes the local development path for contributors who want to run
the application, connect a database, and validate changes.

Prerequisites
-------------

Install the following tools before starting:

* Node.js compatible with Next.js 15;
* pnpm 10.x;
* Docker or Podman for local PostgreSQL;
* Git;
* optional: Sphinx for building ``Documentation`` locally.

Environment
-----------

Copy the example environment file and fill in values for your local setup:

.. code-block:: bash

   cp .env.example .env

The application validates environment variables through ``src/env.js``. For
development-only workflows where external services are not needed, some
commands can be run with ``SKIP_ENV_VALIDATION=1``.

Database
--------

The repository includes ``start-database.sh`` for local PostgreSQL bootstrap.
It checks for an occupied port, reuses an existing container when possible, and
warns about the default password placeholder.

.. code-block:: bash

   ./start-database.sh

After the database is available, run Payload and Drizzle migrations as needed:

.. code-block:: bash

   pnpm payload:migrate
   pnpm db:push

Install and Run
---------------

Install dependencies:

.. code-block:: bash

   pnpm install

Start the development server:

.. code-block:: bash

   pnpm dev

The public site is served at ``http://localhost:3000``. The Payload admin is
available at ``/admin``.

Validation Commands
-------------------

Use the repository scripts for routine checks:

.. list-table::
   :header-rows: 1
   :widths: 24 50

   * - Command
     - Purpose
   * - ``pnpm lint``
     - Validate content links and run Biome linting.
   * - ``pnpm check``
     - Run Biome checks.
   * - ``pnpm test``
     - Run the Vitest suite once.
   * - ``pnpm test:coverage``
     - Run tests with coverage.
   * - ``pnpm build``
     - Build the Next.js application and generate sitemap output.

Build the Documentation
-----------------------

From the repository root:

.. code-block:: bash

   make -C Documentation html

The generated HTML is written to ``Documentation/build/html`` and should not be
committed.

Database
========

Local Bootstrap
---------------

Use the included helper when developing locally:

.. code-block:: bash

   ./start-database.sh

The script is designed for local development and should not be used as a
production database management tool.

Schema Areas
------------

.. list-table::
   :header-rows: 1
   :widths: 24 50

   * - Area
     - Ownership
   * - Payload schema
     - CMS collections, admin content, media metadata, and Payload-managed
       structures.
   * - Drizzle ``blog_*`` tables
     - better-auth users, sessions, accounts, verifications, comments, rates,
       and roles.

Migration Workflow
------------------

For Payload collection changes:

.. code-block:: bash

   pnpm payload:migrate:create
   pnpm payload:migrate
   pnpm payload:generate

For application schema changes:

.. code-block:: bash

   pnpm db:generate
   pnpm db:migrate

During local iteration, ``pnpm db:push`` can be useful, but committed schema
changes should still have a deliberate migration story.

Operational Cautions
--------------------

* Keep Payload and application-owned tables conceptually separate.
* Regenerate Payload types after collection changes.
* Keep ``drizzle.config.ts`` filters aligned with application-owned tables.
* Do not commit local database data directories or generated build artifacts.

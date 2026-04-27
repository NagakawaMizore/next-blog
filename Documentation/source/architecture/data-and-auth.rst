Data, Auth, and Comments
========================

Database Ownership
------------------

The repository uses PostgreSQL for both CMS data and application-owned data.
The separation is logical:

* Payload stores CMS data in the ``payload`` schema.
* Application auth and comments use Drizzle schema objects and ``blog_*``
  tables.

This keeps CMS-managed structures separate from reader interaction data and
allows application migrations to evolve without coupling every change to
Payload internals.

Authentication
--------------

Authentication is configured in ``src/server/auth/index.ts`` with better-auth
and the Drizzle adapter. Current providers:

* Google OAuth;
* GitHub OAuth.

The user model includes an additional ``role`` field with a default value of
``user``. Session lookup is wrapped by ``getSession`` so route and component
code does not need to call the better-auth API directly.

Comments
--------

Comments are configured in ``src/server/comments/config.ts``. The Fuma Comments
storage adapter receives the Drizzle database connection and these schemas:

* ``comments``;
* ``rates``;
* ``roles``;
* ``users``.

The comment API route is mounted under ``/api/comments/[...comment]``. Frontend
comment rendering belongs on post detail pages, while moderation and role
policy should remain server-controlled.

Migration Commands
------------------

.. list-table::
   :header-rows: 1
   :widths: 26 50

   * - Command
     - Use
   * - ``pnpm db:generate``
     - Generate Drizzle migration files after schema changes.
   * - ``pnpm db:migrate``
     - Apply Drizzle migrations.
   * - ``pnpm db:push``
     - Push schema changes directly during local development.
   * - ``pnpm payload:migrate``
     - Run Payload migrations.
   * - ``pnpm payload:migrate:create``
     - Create a new Payload migration.

Implementation Rule
-------------------

When adding data-backed features, decide first whether the data is editorial or
application-owned. Editorial content should be modeled in Payload collections.
Account, interaction, moderation, and operational records should be modeled in
Drizzle.

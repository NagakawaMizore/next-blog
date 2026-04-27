System Overview
===============

Layered View
------------

.. list-table::
   :header-rows: 1
   :widths: 22 34 44

   * - Layer
     - Main Files
     - Responsibility
   * - Presentation
     - ``src/app/(main)``, ``src/components``
     - Render public pages, route handlers, shared UI, rich text, and layout.
   * - Content access
     - ``src/lib/payload-posts.ts``
     - Query Payload and normalize CMS documents into frontend-friendly types.
   * - CMS admin
     - ``payload.config.ts``, ``src/payload``, ``src/app/(payload)``
     - Define editorial collections and expose the admin experience.
   * - Auth and comments
     - ``src/server/auth``, ``src/server/comments``
     - Authenticate users and persist comment data.
   * - Data
     - ``src/server/db``, ``src/migrations``
     - Own Drizzle schema, connection setup, and application migrations.
   * - Content pipeline
     - ``content``, ``source.config.ts``
     - Build local MDX content through Fumadocs.

Request Flow: Reading a Post
----------------------------

1. A route under ``src/app/(main)/(home)/posts/[slug]`` receives a slug.
2. The server component calls ``getPostBySlug``.
3. ``src/lib/payload-posts.ts`` obtains a Payload client and queries
   ``posts`` where ``status`` is ``published``.
4. The raw Payload document is transformed into ``BlogPost``.
5. The page renders rich text content and mounts client-side interactions such
   as sharing and comments.

Request Flow: Writing a Comment
-------------------------------

1. The post detail page renders the Fuma Comments client component.
2. The client calls ``/api/comments/[...comment]``.
3. The route delegates to the Fuma Comments Next.js handler.
4. better-auth validates the session.
5. The Drizzle adapter writes comment, rate, and role data to application-owned
   tables.

Boundaries
----------

Payload owns editorial content and media metadata. The application owns auth,
comments, UI state, route behavior, and integration logic. Keep that boundary
clear when adding features: editorial fields belong in Payload collections;
reader interaction and account behavior belong in ``src/server`` and the app
routes.

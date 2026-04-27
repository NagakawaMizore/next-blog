Content Model
=============

Payload CMS is configured in ``payload.config.ts`` and collection definitions
live under ``src/payload/collections``.

Collections
-----------

.. list-table::
   :header-rows: 1
   :widths: 18 58

   * - Collection
     - Purpose
   * - ``Posts``
     - Blog entries with slug, summary, rich text body, status, tags,
       publication time, author, and optional featured image.
   * - ``Users``
     - Admin users for Payload and shared user representation.
   * - ``Media``
     - Uploaded images and assets used by posts and the admin.

Post Lifecycle
--------------

Posts are authored in Payload and exposed publicly only when their status is
``published``. Public queries in ``src/lib/payload-posts.ts`` consistently
filter on this status before returning data to pages, feeds, search, or tag
views.

The normalized frontend shape is ``BlogPost``. It includes:

* ``id`` and ``slug`` for stable identity;
* ``url`` for public route generation;
* ``title`` and ``description`` for listing and metadata;
* ``content`` for Lexical rich text rendering;
* ``image`` for cover or preview assets;
* ``author`` and dates for byline display;
* ``tags`` for topic navigation.

Tag Strategy
------------

Tags are currently embedded in post documents and counted in memory by
``getAllTags``. This is simple and sufficient for a small blog. If content
volume grows, tag aggregation should move closer to the database or a cached
index.

MDX Content
-----------

The ``content`` directory is processed by Fumadocs through ``source.config.ts``.
Its frontmatter includes date, author, tags, and optional image fields. Treat
MDX content as local authored pages, distinct from Payload-managed posts.

Generated Types
---------------

Payload writes generated TypeScript types to ``payload-types.ts``. Regenerate
them after collection schema changes:

.. code-block:: bash

   pnpm payload:generate

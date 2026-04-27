Routes and Page Responsibilities
================================

Public Routes
-------------

.. list-table::
   :header-rows: 1
   :widths: 22 34 44

   * - Route
     - Main File
     - Responsibility
   * - ``/``
     - ``src/app/(main)/(home)/page.tsx``
     - Home page with hero, recent posts, and newsletter CTA.
   * - ``/posts``
     - ``src/app/(main)/(home)/posts/page.tsx``
     - Paginated list of published posts.
   * - ``/posts/[slug]``
     - ``src/app/(main)/(home)/posts/[slug]/page.tsx``
     - Post detail page with rich text, metadata, sharing, and comments.
   * - ``/tags``
     - ``src/app/(main)/(home)/tags/page.tsx``
     - Tag index with post counts.
   * - ``/tags/[tag]``
     - ``src/app/(main)/(home)/tags/[...slug]/page.tsx``
     - Tag-filtered post list.
   * - ``/about``
     - ``src/app/(main)/(home)/(mdx)/about/page.mdx``
     - MDX profile page.
   * - ``/login``
     - ``src/app/(main)/(auth)/login/page.tsx``
     - OAuth login entry.
   * - ``/admin``
     - ``src/app/(payload)/admin``
     - Payload CMS admin.

API and Generated Routes
------------------------

.. list-table::
   :header-rows: 1
   :widths: 24 56

   * - Route
     - Responsibility
   * - ``/api/auth/[...all]``
     - better-auth route handler.
   * - ``/api/comments/[...comment]``
     - Fuma Comments route handler.
   * - ``/api/search``
     - Public search index endpoint.
   * - ``/rss.xml``
     - Feed output.
   * - ``/banner.png``
     - Site-level Open Graph image.
   * - ``/og/[...slug]``
     - Post-specific Open Graph image.

Routing Rule
------------

Add new public pages under ``src/app/(main)`` and preserve the existing layout
split between the public site and Payload admin. New API routes should document
their public contract in :doc:`../reference/api`.

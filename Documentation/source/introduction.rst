Introduction
============

Next Blog is a reading-first personal publishing platform. It combines a
Next.js App Router frontend with Payload CMS for editorial workflows and a
PostgreSQL-backed application layer for authentication, comments, and related
state.

Product Scope
-------------

The current product scope is intentionally focused:

* publish and manage posts through Payload CMS;
* render public blog pages, tag pages, and post detail pages;
* support OAuth login through better-auth;
* allow signed-in users to comment through Fuma Comments;
* expose RSS, search, metadata, JSON-LD, sitemap, and Open Graph outputs;
* provide a newsletter form and React Email template for future email flows.

The platform is not a generic community CMS. It is a controlled publishing
site with a public reading surface and a private admin surface.

Primary Roles
-------------

.. list-table::
   :header-rows: 1
   :widths: 20 34 36

   * - Role
     - Goal
     - Main Routes
   * - Visitor
     - Browse and read content.
     - ``/``, ``/posts``, ``/posts/[slug]``, ``/tags``
   * - Returning reader
     - Filter by topic and follow updates.
     - ``/tags/[tag]``, ``/rss.xml``
   * - Authenticated user
     - Comment and use account-aware actions.
     - ``/login``, ``/posts/[slug]``
   * - Content admin
     - Create, edit, schedule, and publish content.
     - ``/admin``

Design Direction
----------------

The public site should stay content-first: clear hierarchy, low visual noise,
predictable navigation, and fast access to posts and tags. The existing visual
language uses dashed borders, corner markers, restrained motion, and system
theme support.

Documentation Direction
-----------------------

This Sphinx tree is the canonical documentation system for the repository.
Short product briefs and research notes can still live in ``docs/`` as raw
inputs, but durable engineering documentation should be promoted into
``Documentation/source`` as reStructuredText.

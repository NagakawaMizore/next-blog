Next Blog Documentation
=======================

Next Blog is a full-stack blog platform built with Next.js, Payload CMS,
PostgreSQL, Drizzle ORM, better-auth, and Fuma Comments. This documentation
tree describes the product intent, system architecture, runtime operations,
frontend conventions, and contribution workflow for the repository.

The structure intentionally follows a subsystem-oriented layout: top-level
indexes introduce each area, while deeper pages describe concrete flows,
interfaces, and operational responsibilities. Keep this page small; add new
material under the nearest subsystem directory.

Audience
--------

This documentation is written for:

* maintainers who need to understand the shape of the codebase;
* contributors who need repeatable setup and contribution rules;
* operators who need environment, database, and release notes;
* designers and frontend engineers who need UI conventions.

Project Map
-----------

.. list-table::
   :header-rows: 1
   :widths: 24 56

   * - Area
     - Responsibility
   * - ``src/app/(main)``
     - Public site routes, layouts, API endpoints, feeds, and Open Graph images.
   * - ``src/app/(payload)``
     - Payload CMS admin routes and API bridge.
   * - ``src/components``
     - Shared UI, rich text rendering, layout sections, auth widgets, and forms.
   * - ``src/lib``
     - Application helpers for content access, metadata, validation, actions,
       email, and client utilities.
   * - ``src/server``
     - Database connection, Drizzle schema, authentication, and comment storage.
   * - ``src/payload``
     - Payload collection definitions for posts, users, and media.
   * - ``content``
     - MDX content consumed by the Fumadocs content pipeline.
   * - ``Documentation/source``
     - Sphinx source files for this documentation set.

Contents
--------

.. toctree::
   :maxdepth: 2

   introduction
   getting-started

.. toctree::
   :maxdepth: 2

   architecture/index

.. toctree::
   :maxdepth: 2

   frontend/index

.. toctree::
   :maxdepth: 2

   operations/index

.. toctree::
   :maxdepth: 2

   contributing/index

.. toctree::
   :maxdepth: 2

   reference/index

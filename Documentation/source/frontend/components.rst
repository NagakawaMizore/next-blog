Components
==========

Component Groups
----------------

.. list-table::
   :header-rows: 1
   :widths: 26 52

   * - Area
     - Files
   * - Layout
     - ``src/components/section.tsx``, ``src/components/sections``
   * - Navigation
     - ``src/components/active-link.tsx``, header menu and navbar files
   * - Posts and tags
     - ``src/components/posts/post-card.tsx``, ``src/components/tags``
   * - Forms
     - ``src/components/newsletter-form.tsx``, ``src/components/ui/form.tsx``
   * - Auth
     - ``src/components/auth/user-button.tsx``, ``user-avatar.tsx``
   * - Rich text
     - ``src/components/rich-text``
   * - Base UI
     - ``src/components/ui``

Component Rules
---------------

Use existing primitives first
   Before creating a new component, check ``src/components/ui`` and existing
   page components for a matching pattern.

Keep data access out of presentational components
   Shared components should receive normalized props. Server components and
   ``src/lib`` helpers should handle data fetching.

Preserve accessibility names
   Icon-only buttons and links need explicit labels. Existing tests cover some
   components; extend tests when adding new interactive behavior.

Keep variants local and typed
   Use existing ``class-variance-authority`` patterns for variant-heavy
   controls instead of ad hoc class switches.

Testing
-------

Component tests live beside components using ``*.test.tsx`` or ``*.test.ts``.
Prefer focused tests that assert user-visible behavior, accessibility labels,
and variant output instead of implementation details.

Quality
=======

Tooling
-------

.. list-table::
   :header-rows: 1
   :widths: 20 54

   * - Tool
     - Role
   * - Vitest
     - Unit and component tests.
   * - Testing Library
     - DOM-oriented component assertions.
   * - Biome
     - Linting and formatting checks.
   * - ``scripts/lint.mts``
     - Project-specific content and link validation.
   * - TypeScript
     - Static type checking through project build and editor tooling.

Common Checks
-------------

.. code-block:: bash

   pnpm lint
   pnpm check
   pnpm test
   pnpm build

Testing Guidance
----------------

Add tests when a change affects:

* shared UI components;
* route-visible behavior;
* metadata generation;
* validation logic;
* content transformation;
* pagination;
* authentication or comment policy boundaries.

Keep tests focused on observable behavior. Avoid locking tests to incidental
implementation details unless the implementation itself is the contract.

CI Direction
------------

A complete CI gate should run lint, tests, type-sensitive build checks, and
documentation build checks. If a command requires external secrets, provide a
mocked or validation-skipped CI mode rather than weakening production
validation.

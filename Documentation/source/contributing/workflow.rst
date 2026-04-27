Workflow
========

Before Coding
-------------

1. Identify which subsystem owns the change.
2. Read the nearest existing implementation and tests.
3. Decide whether the change affects runtime behavior, schema, UI, docs, or
   operations.
4. Keep the patch scoped to the requested behavior.

During Implementation
---------------------

* Follow local patterns before introducing new abstractions.
* Keep data fetching in server routes or ``src/lib`` helpers.
* Use existing UI primitives and tokens.
* Update tests when behavior changes.
* Update this documentation when a public contract, architecture, or workflow
  changes.

Before Submitting
-----------------

Run the most relevant checks:

.. code-block:: bash

   pnpm lint
   pnpm test
   make -C Documentation html

For schema changes, include the appropriate migration and generated type
updates.

Review Expectations
-------------------

Reviews should prioritize correctness, behavior regressions, missing tests,
security-sensitive configuration, and unclear contracts. Style comments should
point to an existing repository convention or a maintainability issue.

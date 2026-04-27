Commit Messages
===============

Commit messages should be structured enough to support readable history and
future changelog generation.

Format
------

.. code-block:: text

   <type>(<scope>): <short summary>

   <body>

   <footer>

The header is required. The body is recommended for all non-trivial changes and
should explain why the change exists.

Types
-----

.. list-table::
   :header-rows: 1
   :widths: 18 52

   * - Type
     - Use
   * - ``build``
     - Build system or dependency changes.
   * - ``ci``
     - CI configuration and automation.
   * - ``docs``
     - Documentation-only changes.
   * - ``feat``
     - New user-facing capability.
   * - ``fix``
     - Bug fix.
   * - ``perf``
     - Performance improvement.
   * - ``refactor``
     - Code change that does not add behavior or fix a bug.
   * - ``test``
     - Test additions or corrections.

Scopes
------

Use a scope when it clarifies ownership. Recommended repository scopes:

* ``app``;
* ``payload``;
* ``auth``;
* ``comments``;
* ``db``;
* ``ui``;
* ``email``;
* ``docs``;
* ``tooling``.

Summary Rules
-------------

* Use imperative present tense.
* Do not capitalize the first word unless it is a proper noun.
* Do not end the summary with a period.
* Keep the summary concise.

Examples
--------

.. code-block:: text

   feat(comments): add moderation role checks

   fix(feed): keep rss canonical path consistent

   docs: add Sphinx architecture guide

Reverts
-------

Revert commits should start with ``revert:`` and include the SHA of the commit
being reverted in the body.

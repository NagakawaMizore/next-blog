Documentation
=============

Source Layout
-------------

Sphinx source files live in ``Documentation/source``. Use reStructuredText for
all Sphinx pages.

.. list-table::
   :header-rows: 1
   :widths: 26 50

   * - Directory
     - Purpose
   * - ``architecture``
     - System design, data model, auth, comments, feeds, and risk register.
   * - ``frontend``
     - Routes, UI conventions, components, and accessibility.
   * - ``operations``
     - Setup, environment, database, quality, and documentation workflow.
   * - ``contributing``
     - Commit, review, and code integrity practices.
   * - ``reference``
     - Stable route, command, glossary, and API references.

Build Commands
--------------

Build HTML:

.. code-block:: bash

   make -C Documentation html

Clean generated output:

.. code-block:: bash

   make -C Documentation clean

Authoring Rules
---------------

* Write durable documentation in ``.rst`` files under ``Documentation/source``.
* Keep raw notes in ``docs/`` only when they are not yet ready for the formal
  documentation tree.
* Prefer small pages with focused toctrees over long mixed-topic pages.
* Use literal paths and commands with double backticks.
* Add new pages to the nearest ``index.rst`` toctree.
* Do not commit ``Documentation/build`` output.

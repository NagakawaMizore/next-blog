Accessibility
=============

Baseline
--------

The current frontend already uses semantic landmarks such as ``main``,
``section``, and ``article`` in key routes. Several icon buttons include
accessible labels, and theme-aware colors are centralized through design
tokens.

Required Practices
------------------

* Give icon-only controls an accessible name.
* Preserve visible keyboard focus for custom controls.
* Keep text readable in both light and dark themes.
* Use semantic elements before ARIA.
* Do not hide essential navigation or status only behind animation.
* Validate empty, loading, success, and error states for forms.

Review Checklist
----------------

.. list-table::
   :header-rows: 1
   :widths: 34 42

   * - Check
     - Expected Result
   * - Keyboard navigation
     - Header, menus, buttons, form controls, and links are reachable.
   * - Screen reader labels
     - Icon-only actions have clear names.
   * - Contrast
     - Text and UI states remain readable in light and dark modes.
   * - Layout
     - Text does not overlap or overflow at mobile and desktop breakpoints.
   * - Feedback
     - Form errors and success states are visible and announced where needed.

Known Follow-ups
----------------

* Improve visible focus states for all custom controls.
* Audit icon-only social and action links.
* Add reusable empty states for posts and tags.
* Add visual regression coverage for critical routes.

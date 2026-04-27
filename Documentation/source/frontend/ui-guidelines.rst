UI Guidelines
=============

Product Positioning
-------------------

The UI should feel like a content-first technical blog: readable, restrained,
and efficient. It should avoid marketing-heavy layouts unless the page itself
is explicitly promotional.

Design Principles
-----------------

* Reading first: typography, line length, and contrast should favor long-form
  reading.
* Lightweight navigation: posts, tags, search, theme switching, and account
  actions should remain easy to reach.
* Consistent visual language: dashed borders, corner markers, and subtle
  motion are part of the current identity.
* Low learning cost: anonymous and authenticated flows should be obvious.
* Cross-device consistency: mobile and desktop should share the same hierarchy.

Visual Conventions
------------------

Typography
   Use the configured Geist font family for prose and Geist Mono for code-like
   metadata. Avoid oversized headings inside dense cards or sidebars.

Color
   Use existing design tokens from ``src/styles/globals.css``. The site
   supports light, dark, and system theme modes.

Shape
   Prefer the existing dashed-border and corner-marker treatment for major
   framed sections. Avoid adding unrelated decorative systems.

Motion
   Keep motion short, functional, and tied to state changes. Current examples
   include hero fade-in, hover transitions, theme transition, and share toast.

Page Notes
----------

Home
   Hero, latest posts, and newsletter CTA should establish identity and expose
   current content quickly.

Post list
   Cards should support scanning title, summary, tags, date, and image without
   requiring a detail-page visit.

Post detail
   The article body is primary. Side metadata, share controls, and comments
   should support the reading flow rather than compete with it.

Tags
   Tag pages should make topic discovery fast and preserve the post-list visual
   pattern.

Login
   OAuth options should be clear and minimal. Do not add account-management
   concepts to the login page unless the backend supports them.

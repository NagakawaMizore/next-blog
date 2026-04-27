Route Reference
===============

Public Pages
------------

.. code-block:: text

   /
   /posts
   /posts/[slug]
   /tags
   /tags/[tag]
   /about
   /login

Admin and Payload
-----------------

.. code-block:: text

   /admin
   /api/[...slug]
   /api/graphql
   /api/graphql-playground

Application APIs
----------------

.. code-block:: text

   /api/auth/[...all]
   /api/comments/[...comment]
   /api/search

Generated Assets
----------------

.. code-block:: text

   /rss.xml
   /banner.png
   /og/[...slug]

Route Ownership
---------------

Routes under ``src/app/(main)`` belong to the public application. Routes under
``src/app/(payload)`` belong to Payload CMS integration and should be changed
with care because they affect the admin and CMS API surface.

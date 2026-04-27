API Reference
=============

Search Index
------------

Path
   ``/api/search``

Purpose
   Provides search data for the frontend search experience.

Rules
   Return public published content only. Keep the response shape stable for the
   search client.

Comments
--------

Path
   ``/api/comments/[...comment]``

Purpose
   Handles Fuma Comments operations.

Rules
   Authentication and authorization belong on the server side. Client code
   should not decide comment privileges.

Auth
----

Path
   ``/api/auth/[...all]``

Purpose
   Handles better-auth routes for OAuth and session behavior.

Rules
   Keep provider configuration in ``src/server/auth`` and environment
   validation in ``src/env.js``.

Feed
----

Path
   ``/rss.xml``

Purpose
   Publishes feed output for readers and feed clients.

Rules
   Include published content only and keep route references canonical.

Environment
===========

Validation Source
-----------------

Environment validation is defined in ``src/env.js`` with
``@t3-oss/env-nextjs`` and ``zod``. Empty strings are treated as undefined.

Server Variables
----------------

.. list-table::
   :header-rows: 1
   :widths: 34 44

   * - Variable
     - Purpose
   * - ``DATABASE_URL``
     - PostgreSQL connection string.
   * - ``RESEND_API_KEY``
     - Resend API key. Must start with ``re_``.
   * - ``RESEND_AUDIENCE_ID``
     - Resend audience identifier.
   * - ``EMAIL_FROM``
     - Sender email address.
   * - ``BETTER_AUTH_SECRET``
     - better-auth secret. Required in production.
   * - ``BETTER_AUTH_URL``
     - Optional explicit auth base URL.
   * - ``GOOGLE_CLIENT_ID`` / ``GOOGLE_CLIENT_SECRET``
     - Google OAuth credentials.
   * - ``GITHUB_CLIENT_ID`` / ``GITHUB_CLIENT_SECRET``
     - GitHub OAuth credentials.

Client Variables
----------------

.. list-table::
   :header-rows: 1
   :widths: 34 44

   * - Variable
     - Purpose
   * - ``NEXT_PUBLIC_UMAMI_URL``
     - Optional Umami analytics script URL.
   * - ``NEXT_PUBLIC_UMAMI_WEBSITE_ID``
     - Optional Umami site identifier.

Skipping Validation
-------------------

``SKIP_ENV_VALIDATION=1`` can be used for limited local or container workflows.
Do not rely on it for production builds.

Production Notes
----------------

Production should use explicit, non-default secrets for Payload and better-auth
and an explicit public site URL for canonical links and generated metadata.

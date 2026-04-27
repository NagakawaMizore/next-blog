Risks and Technical Debt
========================

This page tracks known architectural risks and follow-up work. Keep entries
short, actionable, and tied to repository evidence.

Current Risk Register
---------------------

.. list-table::
   :header-rows: 1
   :widths: 10 26 28 30

   * - Priority
     - Finding
     - Evidence
     - Recommendation
   * - P0
     - Email utility type dependency should be verified.
     - ``src/lib/resend.ts`` imports project-local types.
     - Keep type sources explicit and covered by type checks.
   * - P0
     - Payload secret fallback is unsafe for production.
     - ``payload.config.ts`` falls back to ``your-secret-key``.
     - Fail fast in production when ``PAYLOAD_SECRET`` is missing.
   * - P1
     - RSS canonical path must stay consistent.
     - Route is ``/rss.xml``.
     - Use the same path in metadata, README, docs, and sitemap config.
   * - P1
     - In-memory aggregation can become expensive.
     - Search, RSS, and tag counts read batches of posts.
     - Add caching or database-side aggregation when content volume grows.
   * - P1
     - Canonical URL configuration needs production hardening.
     - Deployment URL handling depends on environment conventions.
     - Prefer an explicit public site URL for production.
   * - P2
     - Comment role governance needs policy tests.
     - Comment storage includes roles.
     - Define moderation behavior before adding privileged comment actions.

Roadmap
-------

Phase 1: correctness and configuration hardening
   Fix production secret handling, verify email types, and align feed paths.

Phase 2: scalability
   Cache expensive public indexes, move tag aggregation closer to storage, and
   add clear revalidation boundaries.

Phase 3: governance
   Add architecture decision records, route-level integration tests, and CI
   checks for type safety, tests, linting, and documentation links.

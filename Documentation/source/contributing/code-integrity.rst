Code Integrity
==============

This project should preserve a reviewable and trustworthy history. The raw
``docs/protecting-code-integrity.md`` note covers broader PGP background; this
page records repository-level expectations.

Source Provenance
-----------------

* Prefer signed commits and signed tags when publishing releases.
* Protect credentials and signing keys outside the repository.
* Do not commit generated secrets, local database state, or build output.
* Review dependency changes with the same care as source changes.

Git Practices
-------------

* Keep commits focused by subsystem or behavior.
* Avoid mixing generated files with hand-written changes unless the generated
  files are required for the change.
* Use branches for non-trivial work.
* Rebase or merge deliberately; avoid history rewrites on shared branches
  unless the team has agreed.

Release Tags
------------

Release tags should be annotated and signed when possible:

.. code-block:: bash

   git tag -s v1.2.0 -m "v1.2.0"

Verification
------------

Before trusting a release or dependency bump, verify:

* tag or commit signature when available;
* changelog and diff scope;
* dependency lockfile changes;
* CI result for the exact commit being released.

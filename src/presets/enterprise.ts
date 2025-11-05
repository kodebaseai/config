/**
 * Enterprise preset - maximum safety and compliance.
 *
 * Best for:
 * - Large teams and enterprises
 * - Projects with strict compliance requirements
 * - High-stakes production systems
 *
 * Key features:
 * - Cascade PRs without auto-merge (manual approval required)
 * - Strict validation with all checks enforced
 * - Blocking hooks to prevent invalid states
 * - Required code reviews and checks
 * - Batched cascade execution for stability
 */

import type { ConfigPreset } from "./types.js";

export const enterprisePreset: ConfigPreset = {
  version: "1.0",
  artifactsDir: ".kodebase/artifacts",
  gitOps: {
    post_merge: {
      strategy: "cascade_pr",
      cascade_pr: {
        auto_merge: false,
        require_checks: true,
        labels: ["cascade", "automated", "requires-review"],
        branch_prefix: "cascade/",
        delete_branch: true,
      },
    },
    post_checkout: {
      create_draft_pr: true,
      pr_template: "default",
      auto_assign: true,
      auto_add_labels: true,
      notify_team: true,
    },
    hooks: {
      enabled: true,
      non_blocking: false,
      log_errors: true,
      log_level: "info",
      pre_commit: {
        enabled: true,
        non_blocking: false,
        validate_schema: true,
        validate_state_machine: true,
        validate_dependencies: true,
      },
      pre_push: {
        enabled: true,
        non_blocking: false,
        warn_wip_artifacts: true,
        warn_non_artifact_branches: true,
      },
    },
    platform: {
      type: "github",
      auth_strategy: "auto",
    },
    pr_creation: {
      auto_assign: true,
      auto_add_labels: true,
      auto_request_reviewers: true,
      link_milestone: true,
      add_to_project: true,
    },
    cascades: {
      mode: "batched",
      batch_delay_seconds: 60,
      max_batch_size: 10,
      parallel_execution: false,
      max_parallelism: 1,
      dry_run: false,
      require_confirmation: true,
    },
    validation: {
      enforce_schema: true,
      enforce_state_machine: true,
      enforce_dependencies: true,
      warn_missing_fields: true,
      error_on_warnings: true,
      allow_wip_commits: false,
      allow_cross_milestone_deps: false,
      warn_draft_artifacts: true,
      warn_blocked_artifacts: true,
    },
    branches: {
      delete_after_merge: true,
      delete_cascade_branches: true,
      require_pr_for_main: true,
      allowed_direct_branches: [],
    },
    commits: {
      format: "conventional",
      conventional: {
        type_prefix: "feat",
        breaking_change_marker: "!",
      },
      add_coauthor: true,
    },
  },
};

/**
 * Solo developer preset - optimized for speed and minimal overhead.
 *
 * Best for:
 * - Individual developers working alone
 * - Rapid prototyping and experimentation
 * - Small personal projects
 *
 * Key features:
 * - Direct commits without PRs (fast workflow)
 * - Non-blocking hooks (no interruptions)
 * - Minimal validation overhead
 * - Auto-push immediately after commit
 */

import type { ConfigPreset } from "./types.js";

export const soloPreset: ConfigPreset = {
  version: "1.0",
  artifactsDir: ".kodebase/artifacts",
  gitOps: {
    post_merge: {
      strategy: "direct_commit",
      direct_commit: {
        commit_prefix: "chore(cascade): ",
        push_immediately: true,
      },
    },
    post_checkout: {
      create_draft_pr: false,
      auto_assign: false,
      auto_add_labels: false,
      notify_team: false,
    },
    hooks: {
      enabled: true,
      non_blocking: true,
      log_errors: true,
      log_level: "warn",
    },
    platform: {
      type: "github",
      auth_strategy: "auto",
    },
    cascades: {
      mode: "immediate",
      parallel_execution: true,
      max_parallelism: 5,
      dry_run: false,
      require_confirmation: false,
    },
    validation: {
      enforce_schema: true,
      enforce_state_machine: false,
      enforce_dependencies: false,
      warn_missing_fields: false,
      error_on_warnings: false,
      allow_wip_commits: true,
      allow_cross_milestone_deps: true,
    },
    branches: {
      delete_after_merge: true,
      delete_cascade_branches: true,
      require_pr_for_main: false,
    },
    commits: {
      format: "simple",
      add_coauthor: false,
    },
  },
};

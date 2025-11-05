/**
 * Core configuration types for Kodebase.
 */

import type { TGitPlatform } from "@kodebase/core";

// ============================================================================
// Re-exported Types
// ============================================================================

/**
 * Supported git platforms (re-exported from @kodebase/core)
 */
export type { TGitPlatform };

/**
 * Platform type for git operations.
 * @deprecated Use TGitPlatform instead
 */
export type PlatformType = TGitPlatform;

// ============================================================================
// Enum Types
// ============================================================================

/**
 * Post-merge strategy for handling artifact completions.
 */
export type PostMergeStrategy = "cascade_pr" | "direct_commit" | "manual";

/**
 * Authentication strategy for platform access.
 */
export type AuthStrategy = "auto" | "token" | "cli";

/**
 * Cascade execution mode.
 */
export type CascadeMode = "immediate" | "batched" | "manual";

/**
 * Commit message format.
 */
export type CommitFormat = "conventional" | "simple" | "custom";

/**
 * Log level for hook operations.
 */
export type LogLevel = "debug" | "info" | "warn" | "error";

// ============================================================================
// Post-Merge Configuration
// ============================================================================

/**
 * Configuration for cascade PR strategy.
 */
export interface CascadePRConfig {
  /** Auto-merge PRs when checks pass */
  auto_merge?: boolean;
  /** Require checks to pass before merge */
  require_checks?: boolean;
  /** Labels to add to cascade PRs */
  labels?: string[];
  /** Branch prefix for cascade PRs */
  branch_prefix?: string;
  /** Delete branch after merge */
  delete_branch?: boolean;
}

/**
 * Configuration for direct commit strategy.
 */
export interface DirectCommitConfig {
  /** Prefix for cascade commits */
  commit_prefix?: string;
  /** Push immediately after commit */
  push_immediately?: boolean;
}

/**
 * Post-merge behavior configuration.
 */
export interface PostMergeConfig {
  /** Strategy to use for post-merge cascades */
  strategy?: PostMergeStrategy;
  /** Configuration for cascade_pr strategy */
  cascade_pr?: CascadePRConfig;
  /** Configuration for direct_commit strategy */
  direct_commit?: DirectCommitConfig;
}

// ============================================================================
// Post-Checkout Configuration
// ============================================================================

/**
 * Post-checkout behavior configuration.
 */
export interface PostCheckoutConfig {
  /** Create draft PR automatically */
  create_draft_pr?: boolean;
  /** PR template to use */
  pr_template?: string;
  /** Auto-assign PR to artifact assignee */
  auto_assign?: boolean;
  /** Auto-add labels from artifact */
  auto_add_labels?: boolean;
  /** Notify team members */
  notify_team?: boolean;
}

// ============================================================================
// Hooks Configuration
// ============================================================================

/**
 * Individual hook configuration.
 */
export interface HookConfig {
  /** Whether the hook is enabled */
  enabled?: boolean;
  /** Whether hook should be non-blocking */
  non_blocking?: boolean;
  /** Custom script to run (optional) */
  script?: string;
}

/**
 * Pre-commit hook configuration.
 */
export interface PreCommitConfig extends HookConfig {
  /** Validate artifact schema */
  validate_schema?: boolean;
  /** Validate state machine transitions */
  validate_state_machine?: boolean;
  /** Validate dependency relationships */
  validate_dependencies?: boolean;
}

/**
 * Pre-push hook configuration.
 */
export interface PrePushConfig extends HookConfig {
  /** Warn about WIP artifacts */
  warn_wip_artifacts?: boolean;
  /** Warn about non-artifact branches */
  warn_non_artifact_branches?: boolean;
}

/**
 * Git hooks configuration.
 */
export interface HooksConfig {
  /** Master switch for all hooks */
  enabled?: boolean;
  /** Default non-blocking behavior */
  non_blocking?: boolean;
  /** Log errors from hooks */
  log_errors?: boolean;
  /** Log level for hook operations */
  log_level?: LogLevel;
  /** Post-checkout hook configuration */
  post_checkout?: HookConfig;
  /** Post-merge hook configuration */
  post_merge?: HookConfig;
  /** Pre-commit hook configuration */
  pre_commit?: PreCommitConfig;
  /** Pre-push hook configuration */
  pre_push?: PrePushConfig;
}

// ============================================================================
// Platform Configuration
// ============================================================================

/**
 * GitHub-specific configuration.
 */
export interface GitHubConfig {
  /** GitHub API URL */
  api_url?: string;
  /** Environment variable for token */
  token_env_var?: string;
}

/**
 * GitLab-specific configuration.
 */
export interface GitLabConfig {
  /** GitLab API URL */
  api_url?: string;
  /** Environment variable for token */
  token_env_var?: string;
}

/**
 * Bitbucket-specific configuration.
 */
export interface BitbucketConfig {
  /** Bitbucket API URL */
  api_url?: string;
  /** Environment variable for token */
  token_env_var?: string;
}

/**
 * Platform configuration.
 */
export interface PlatformConfig {
  /** Platform type */
  type?: PlatformType;
  /** Authentication strategy */
  auth_strategy?: AuthStrategy;
  /** GitHub-specific configuration */
  github?: GitHubConfig;
  /** GitLab-specific configuration */
  gitlab?: GitLabConfig;
  /** Bitbucket-specific configuration */
  bitbucket?: BitbucketConfig;
}

// ============================================================================
// PR Creation Configuration
// ============================================================================

/**
 * PR creation settings.
 */
export interface PRCreationConfig {
  /** PR title template */
  title_template?: string;
  /** PR body template */
  body_template?: string;
  /** Auto-assign PR to artifact assignee */
  auto_assign?: boolean;
  /** Auto-add labels from artifact */
  auto_add_labels?: boolean;
  /** Auto-request reviewers */
  auto_request_reviewers?: boolean;
  /** Additional labels to add */
  additional_labels?: string[];
  /** Default reviewers */
  default_reviewers?: string[];
  /** Link milestone to PR */
  link_milestone?: boolean;
  /** Add PR to project */
  add_to_project?: boolean;
  /** Project ID for adding PRs */
  project_id?: string;
}

// ============================================================================
// Cascades Configuration
// ============================================================================

/**
 * Cascade execution settings.
 */
export interface CascadesConfig {
  /** Cascade execution mode */
  mode?: CascadeMode;
  /** Batch delay in seconds (for batched mode) */
  batch_delay_seconds?: number;
  /** Maximum batch size (for batched mode) */
  max_batch_size?: number;
  /** Enable parallel execution */
  parallel_execution?: boolean;
  /** Maximum parallelism */
  max_parallelism?: number;
  /** Dry run mode (no actual changes) */
  dry_run?: boolean;
  /** Require confirmation before executing */
  require_confirmation?: boolean;
}

// ============================================================================
// Validation Configuration
// ============================================================================

/**
 * Validation settings.
 */
export interface ValidationConfig {
  /** Enforce schema validation */
  enforce_schema?: boolean;
  /** Enforce state machine validation */
  enforce_state_machine?: boolean;
  /** Enforce dependency validation */
  enforce_dependencies?: boolean;
  /** Warn about missing optional fields */
  warn_missing_fields?: boolean;
  /** Treat warnings as errors */
  error_on_warnings?: boolean;
  /** Allow WIP commits */
  allow_wip_commits?: boolean;
  /** Allow cross-milestone dependencies */
  allow_cross_milestone_deps?: boolean;
  /** Warn about draft artifacts on push */
  warn_draft_artifacts?: boolean;
  /** Warn about blocked artifacts on push */
  warn_blocked_artifacts?: boolean;
}

// ============================================================================
// Branch Management Configuration
// ============================================================================

/**
 * Branch management settings.
 */
export interface BranchesConfig {
  /** Artifact branch naming format */
  artifact_branch_format?: string;
  /** Cascade branch naming format */
  cascade_branch_format?: string;
  /** Delete branch after merge */
  delete_after_merge?: boolean;
  /** Delete cascade branches after merge */
  delete_cascade_branches?: boolean;
  /** Require PR for main branch */
  require_pr_for_main?: boolean;
  /** Branches allowed for direct commits */
  allowed_direct_branches?: string[];
}

// ============================================================================
// Commit Message Configuration
// ============================================================================

/**
 * Conventional commits configuration.
 */
export interface ConventionalCommitsConfig {
  /** Type prefix (e.g., "feat", "fix") */
  type_prefix?: string;
  /** Scope for commits */
  scope?: string;
  /** Breaking change marker */
  breaking_change_marker?: string;
}

/**
 * Commit message formatting settings.
 */
export interface CommitsConfig {
  /** Commit message format */
  format?: CommitFormat;
  /** Conventional commits configuration */
  conventional?: ConventionalCommitsConfig;
  /** Custom template for commit messages */
  custom_template?: string;
  /** Prefix for cascade commits */
  cascade_prefix?: string;
  /** Prefix for validation commits */
  validation_prefix?: string;
  /** Add co-author to commits */
  add_coauthor?: boolean;
  /** Agent email format for co-authorship */
  agent_email_format?: string;
}

// ============================================================================
// Root Configuration
// ============================================================================

/**
 * Git operations configuration.
 */
export interface GitOpsConfig {
  /** Post-merge behavior */
  post_merge?: PostMergeConfig;
  /** Post-checkout behavior */
  post_checkout?: PostCheckoutConfig;
  /** Git hooks configuration */
  hooks?: HooksConfig;
  /** Platform configuration */
  platform?: PlatformConfig;
  /** PR creation settings */
  pr_creation?: PRCreationConfig;
  /** Cascade execution settings */
  cascades?: CascadesConfig;
  /** Validation settings */
  validation?: ValidationConfig;
  /** Branch management settings */
  branches?: BranchesConfig;
  /** Commit message formatting */
  commits?: CommitsConfig;
}

/**
 * Root Kodebase configuration.
 */
export interface KodebaseConfig {
  /** Configuration version */
  version?: string;
  /** Git operations configuration */
  gitOps?: GitOpsConfig;
  /** Base directory for artifacts (default: .kodebase/artifacts) */
  artifactsDir?: string;
}

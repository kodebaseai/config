/**
 * Configuration validation functions using Zod.
 */
import { z } from "zod";
// ============================================================================
// Enum Schemas
// ============================================================================
/**
 * Post-merge strategy schema.
 */
export const postMergeStrategySchema = z
    .enum(["cascade_pr", "direct_commit", "manual"])
    .describe("Strategy for handling post-merge cascades");
/**
 * Platform type schema.
 */
export const platformTypeSchema = z
    .enum(["github", "gitlab", "bitbucket"])
    .describe("Git platform type");
/**
 * Authentication strategy schema.
 */
export const authStrategySchema = z
    .enum(["auto", "token", "cli"])
    .describe("Platform authentication strategy");
/**
 * Cascade mode schema.
 */
export const cascadeModeSchema = z
    .enum(["immediate", "batched", "manual"])
    .describe("Cascade execution mode");
/**
 * Commit format schema.
 */
export const commitFormatSchema = z
    .enum(["conventional", "simple", "custom"])
    .describe("Commit message format");
/**
 * Log level schema.
 */
export const logLevelSchema = z
    .enum(["debug", "info", "warn", "error"])
    .describe("Logging level for hook operations");
// ============================================================================
// Post-Merge Configuration Schemas
// ============================================================================
/**
 * Cascade PR configuration schema.
 */
export const cascadePRConfigSchema = z
    .object({
    auto_merge: z
        .boolean()
        .optional()
        .default(true)
        .describe("Auto-merge PRs when checks pass"),
    require_checks: z
        .boolean()
        .optional()
        .default(true)
        .describe("Require checks to pass before merge"),
    labels: z
        .array(z.string())
        .optional()
        .default(["cascade", "automated"])
        .describe("Labels to add to cascade PRs"),
    branch_prefix: z
        .string()
        .optional()
        .default("cascade/")
        .describe("Branch prefix for cascade PRs"),
    delete_branch: z
        .boolean()
        .optional()
        .default(true)
        .describe("Delete branch after merge"),
})
    .describe("Configuration for cascade PR strategy");
/**
 * Direct commit configuration schema.
 */
export const directCommitConfigSchema = z
    .object({
    commit_prefix: z
        .string()
        .optional()
        .default("chore(cascade): ")
        .describe("Prefix for cascade commits"),
    push_immediately: z
        .boolean()
        .optional()
        .default(true)
        .describe("Push immediately after commit"),
})
    .describe("Configuration for direct commit strategy");
/**
 * Post-merge configuration schema.
 */
export const postMergeConfigSchema = z
    .object({
    strategy: postMergeStrategySchema.optional().default("cascade_pr"),
    cascade_pr: cascadePRConfigSchema.optional(),
    direct_commit: directCommitConfigSchema.optional(),
})
    .describe("Post-merge behavior configuration");
// ============================================================================
// Post-Checkout Configuration Schema
// ============================================================================
/**
 * Post-checkout configuration schema.
 */
export const postCheckoutConfigSchema = z
    .object({
    create_draft_pr: z
        .boolean()
        .optional()
        .default(true)
        .describe("Create draft PR automatically"),
    pr_template: z
        .string()
        .optional()
        .default("default")
        .describe("PR template to use (default, minimal, detailed, or custom path)"),
    auto_assign: z
        .boolean()
        .optional()
        .default(true)
        .describe("Auto-assign PR to artifact assignee"),
    auto_add_labels: z
        .boolean()
        .optional()
        .default(true)
        .describe("Auto-add labels from artifact"),
    notify_team: z
        .boolean()
        .optional()
        .default(false)
        .describe("Notify team members"),
})
    .describe("Post-checkout behavior configuration");
// ============================================================================
// Hooks Configuration Schemas
// ============================================================================
/**
 * Individual hook configuration schema.
 */
export const hookConfigSchema = z
    .object({
    enabled: z.boolean().optional().describe("Whether the hook is enabled"),
    non_blocking: z
        .boolean()
        .optional()
        .describe("Whether hook should be non-blocking"),
    script: z.string().optional().describe("Custom script to run"),
})
    .describe("Individual hook configuration");
/**
 * Pre-commit hook configuration schema.
 */
export const preCommitConfigSchema = hookConfigSchema
    .extend({
    validate_schema: z
        .boolean()
        .optional()
        .default(true)
        .describe("Validate artifact schema"),
    validate_state_machine: z
        .boolean()
        .optional()
        .default(true)
        .describe("Validate state machine transitions"),
    validate_dependencies: z
        .boolean()
        .optional()
        .default(true)
        .describe("Validate dependency relationships"),
})
    .describe("Pre-commit hook configuration");
/**
 * Pre-push hook configuration schema.
 */
export const prePushConfigSchema = hookConfigSchema
    .extend({
    warn_wip_artifacts: z
        .boolean()
        .optional()
        .default(true)
        .describe("Warn about WIP artifacts"),
    warn_non_artifact_branches: z
        .boolean()
        .optional()
        .default(false)
        .describe("Warn about non-artifact branches"),
})
    .describe("Pre-push hook configuration");
/**
 * Git hooks configuration schema.
 */
export const hooksConfigSchema = z
    .object({
    enabled: z
        .boolean()
        .optional()
        .default(true)
        .describe("Master switch for all hooks"),
    non_blocking: z
        .boolean()
        .optional()
        .default(true)
        .describe("Default non-blocking behavior"),
    log_errors: z
        .boolean()
        .optional()
        .default(true)
        .describe("Log errors from hooks"),
    log_level: logLevelSchema.optional().default("info"),
    post_checkout: hookConfigSchema.optional(),
    post_merge: hookConfigSchema.optional(),
    pre_commit: preCommitConfigSchema.optional(),
    pre_push: prePushConfigSchema.optional(),
})
    .describe("Git hooks configuration");
// ============================================================================
// Platform Configuration Schemas
// ============================================================================
/**
 * GitHub configuration schema.
 */
export const gitHubConfigSchema = z
    .object({
    api_url: z
        .string()
        .url()
        .optional()
        .default("https://api.github.com")
        .describe("GitHub API URL"),
    token_env_var: z
        .string()
        .optional()
        .default("GITHUB_TOKEN")
        .describe("Environment variable for token"),
})
    .describe("GitHub-specific configuration");
/**
 * GitLab configuration schema.
 */
export const gitLabConfigSchema = z
    .object({
    api_url: z
        .string()
        .url()
        .optional()
        .default("https://gitlab.com/api/v4")
        .describe("GitLab API URL"),
    token_env_var: z
        .string()
        .optional()
        .default("GITLAB_TOKEN")
        .describe("Environment variable for token"),
})
    .describe("GitLab-specific configuration");
/**
 * Bitbucket configuration schema.
 */
export const bitbucketConfigSchema = z
    .object({
    api_url: z
        .string()
        .url()
        .optional()
        .default("https://api.bitbucket.org/2.0")
        .describe("Bitbucket API URL"),
    token_env_var: z
        .string()
        .optional()
        .default("BITBUCKET_TOKEN")
        .describe("Environment variable for token"),
})
    .describe("Bitbucket-specific configuration");
/**
 * Platform configuration schema.
 */
export const platformConfigSchema = z
    .object({
    type: platformTypeSchema.optional().default("github"),
    auth_strategy: authStrategySchema.optional().default("auto"),
    github: gitHubConfigSchema.optional(),
    gitlab: gitLabConfigSchema.optional(),
    bitbucket: bitbucketConfigSchema.optional(),
})
    .describe("Platform configuration");
// ============================================================================
// PR Creation Configuration Schema
// ============================================================================
/**
 * PR creation configuration schema.
 */
export const prCreationConfigSchema = z
    .object({
    title_template: z
        .string()
        .optional()
        .default("{artifact_id}: {title}")
        .describe("PR title template"),
    body_template: z
        .string()
        .optional()
        .default("## Summary\n{summary}\n\n## Acceptance Criteria\n{acceptance_criteria}")
        .describe("PR body template"),
    auto_assign: z
        .boolean()
        .optional()
        .default(true)
        .describe("Auto-assign PR to artifact assignee"),
    auto_add_labels: z
        .boolean()
        .optional()
        .default(true)
        .describe("Auto-add labels from artifact"),
    auto_request_reviewers: z
        .boolean()
        .optional()
        .default(false)
        .describe("Auto-request reviewers"),
    additional_labels: z
        .array(z.string())
        .optional()
        .default([])
        .describe("Additional labels to add"),
    default_reviewers: z
        .array(z.string())
        .optional()
        .default([])
        .describe("Default reviewers"),
    link_milestone: z
        .boolean()
        .optional()
        .default(true)
        .describe("Link milestone to PR"),
    add_to_project: z
        .boolean()
        .optional()
        .default(false)
        .describe("Add PR to project"),
    project_id: z.string().optional().describe("Project ID for adding PRs"),
})
    .describe("PR creation settings");
// ============================================================================
// Cascades Configuration Schema
// ============================================================================
/**
 * Cascade execution configuration schema.
 */
export const cascadesConfigSchema = z
    .object({
    mode: cascadeModeSchema.optional().default("immediate"),
    batch_delay_seconds: z
        .number()
        .int()
        .positive()
        .optional()
        .default(30)
        .describe("Batch delay in seconds (for batched mode)"),
    max_batch_size: z
        .number()
        .int()
        .positive()
        .optional()
        .default(10)
        .describe("Maximum batch size (for batched mode)"),
    parallel_execution: z
        .boolean()
        .optional()
        .default(true)
        .describe("Enable parallel execution"),
    max_parallelism: z
        .number()
        .int()
        .min(1)
        .optional()
        .default(5)
        .describe("Maximum parallelism"),
    dry_run: z
        .boolean()
        .optional()
        .default(false)
        .describe("Dry run mode (no actual changes)"),
    require_confirmation: z
        .boolean()
        .optional()
        .default(false)
        .describe("Require confirmation before executing"),
})
    .describe("Cascade execution settings");
// ============================================================================
// Validation Configuration Schema
// ============================================================================
/**
 * Validation configuration schema.
 */
export const validationConfigSchema = z
    .object({
    enforce_schema: z
        .boolean()
        .optional()
        .default(true)
        .describe("Enforce schema validation"),
    enforce_state_machine: z
        .boolean()
        .optional()
        .default(true)
        .describe("Enforce state machine validation"),
    enforce_dependencies: z
        .boolean()
        .optional()
        .default(true)
        .describe("Enforce dependency validation"),
    warn_missing_fields: z
        .boolean()
        .optional()
        .default(true)
        .describe("Warn about missing optional fields"),
    error_on_warnings: z
        .boolean()
        .optional()
        .default(false)
        .describe("Treat warnings as errors"),
    allow_wip_commits: z
        .boolean()
        .optional()
        .default(true)
        .describe("Allow WIP commits"),
    allow_cross_milestone_deps: z
        .boolean()
        .optional()
        .default(false)
        .describe("Allow cross-milestone dependencies"),
    warn_draft_artifacts: z
        .boolean()
        .optional()
        .default(true)
        .describe("Warn about draft artifacts on push"),
    warn_blocked_artifacts: z
        .boolean()
        .optional()
        .default(true)
        .describe("Warn about blocked artifacts on push"),
})
    .describe("Validation settings");
// ============================================================================
// Branch Management Configuration Schema
// ============================================================================
/**
 * Branch management configuration schema.
 */
export const branchesConfigSchema = z
    .object({
    artifact_branch_format: z
        .string()
        .optional()
        .default("{artifact_id}")
        .describe("Artifact branch naming format"),
    cascade_branch_format: z
        .string()
        .optional()
        .default("cascade/{artifact_id}")
        .describe("Cascade branch naming format"),
    delete_after_merge: z
        .boolean()
        .optional()
        .default(true)
        .describe("Delete branch after merge"),
    delete_cascade_branches: z
        .boolean()
        .optional()
        .default(true)
        .describe("Delete cascade branches after merge"),
    require_pr_for_main: z
        .boolean()
        .optional()
        .default(true)
        .describe("Require PR for main branch"),
    allowed_direct_branches: z
        .array(z.string())
        .optional()
        .default([])
        .describe("Branches allowed for direct commits"),
})
    .describe("Branch management settings");
// ============================================================================
// Commit Message Configuration Schema
// ============================================================================
/**
 * Conventional commits configuration schema.
 */
export const conventionalCommitsConfigSchema = z
    .object({
    type_prefix: z
        .string()
        .optional()
        .default("feat")
        .describe("Type prefix (e.g., 'feat', 'fix')"),
    scope: z.string().optional().describe("Scope for commits"),
    breaking_change_marker: z
        .string()
        .optional()
        .default("!")
        .describe("Breaking change marker"),
})
    .describe("Conventional commits configuration");
/**
 * Commit message formatting configuration schema.
 */
export const commitsConfigSchema = z
    .object({
    format: commitFormatSchema.optional().default("conventional"),
    conventional: conventionalCommitsConfigSchema.optional(),
    custom_template: z
        .string()
        .optional()
        .describe("Custom template for commit messages"),
    cascade_prefix: z
        .string()
        .optional()
        .default("chore(cascade): ")
        .describe("Prefix for cascade commits"),
    validation_prefix: z
        .string()
        .optional()
        .default("chore(validation): ")
        .describe("Prefix for validation commits"),
    add_coauthor: z
        .boolean()
        .optional()
        .default(true)
        .describe("Add co-author to commits"),
    agent_email_format: z
        .string()
        .optional()
        .default("cascade@kodebase.ai")
        .describe("Agent email format for co-authorship"),
})
    .describe("Commit message formatting settings");
// ============================================================================
// Root Configuration Schemas
// ============================================================================
/**
 * Git operations configuration schema.
 */
export const gitOpsConfigSchema = z
    .object({
    post_merge: postMergeConfigSchema.optional(),
    post_checkout: postCheckoutConfigSchema.optional(),
    hooks: hooksConfigSchema.optional(),
    platform: platformConfigSchema.optional(),
    pr_creation: prCreationConfigSchema.optional(),
    cascades: cascadesConfigSchema.optional(),
    validation: validationConfigSchema.optional(),
    branches: branchesConfigSchema.optional(),
    commits: commitsConfigSchema.optional(),
})
    .describe("Git operations configuration");
/**
 * Root Kodebase configuration schema.
 */
export const kodebaseConfigSchema = z
    .object({
    version: z
        .string()
        .optional()
        .default("1.0")
        .describe("Configuration version"),
    gitOps: gitOpsConfigSchema.optional(),
    artifactsDir: z
        .string()
        .optional()
        .default(".kodebase/artifacts")
        .describe("Base directory for artifacts"),
})
    .describe("Root Kodebase configuration");
// ============================================================================
// Validation Function
// ============================================================================
/**
 * Validates a Kodebase configuration object.
 *
 * @param config - The configuration to validate
 * @returns The validated configuration with defaults applied
 * @throws {z.ZodError} If the configuration is invalid
 *
 * @example
 * ```typescript
 * const config = validateConfig({
 *   artifactsDir: ".kodebase/artifacts",
 *   gitOps: {
 *     post_merge: {
 *       strategy: "cascade_pr"
 *     }
 *   }
 * });
 * ```
 */
export function validateConfig(config) {
    return kodebaseConfigSchema.parse(config);
}
//# sourceMappingURL=validate-config.js.map
/**
 * @kodebase/config
 *
 * Configuration system for Kodebase git operations.
 *
 * @packageDocumentation
 */
export { ConfigLoadError, DEFAULT_CONFIG_PATH, getDefaultConfig, loadConfig, } from "./load-config.js";
export { type ConfigVersion, createDeprecationWarning, DEFAULT_VERSION, type DeprecationWarning, detectVersion, type MigrationResult, migrateConfig, SUPPORTED_VERSIONS, } from "./migrate-config.js";
export { defaultPreset, enterprisePreset, presets, smallTeamPreset, soloPreset, } from "./presets/index.js";
export type { ConfigPreset } from "./presets/types.js";
export type { AuthStrategy, BitbucketConfig, BranchesConfig, CascadeMode, CascadePRConfig, CascadesConfig, CommitFormat, CommitsConfig, ConventionalCommitsConfig, DirectCommitConfig, GitHubConfig, GitLabConfig, GitOpsConfig, HookConfig, HooksConfig, KodebaseConfig, LogLevel, PlatformConfig, PlatformType, PostCheckoutConfig, PostMergeConfig, PostMergeStrategy, PRCreationConfig, PreCommitConfig, PrePushConfig, ValidationConfig, } from "./types.js";
export { validateConfig } from "./validate-config.js";
//# sourceMappingURL=index.d.ts.map
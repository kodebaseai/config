/**
 * @kodebase/config
 *
 * Configuration system for Kodebase git operations.
 *
 * @packageDocumentation
 */
export { loadConfig } from "./load-config.js";
export { defaultPreset } from "./presets/default.js";
export type { ConfigPreset } from "./presets/types.js";
export type { AuthStrategy, BitbucketConfig, BranchesConfig, CascadeMode, CascadePRConfig, CascadesConfig, CommitFormat, CommitsConfig, ConventionalCommitsConfig, DirectCommitConfig, GitHubConfig, GitLabConfig, GitOpsConfig, HookConfig, HooksConfig, KodebaseConfig, LogLevel, PlatformConfig, PlatformType, PostCheckoutConfig, PostMergeConfig, PostMergeStrategy, PRCreationConfig, PreCommitConfig, PrePushConfig, ValidationConfig, } from "./types.js";
export { validateConfig } from "./validate-config.js";
//# sourceMappingURL=index.d.ts.map
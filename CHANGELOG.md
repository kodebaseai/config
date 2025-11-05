# @kodebase/config

## 0.2.1

### Patch Changes

- [#130](https://github.com/kodebaseai/kodebase/pull/130) [`56a3e2e`](https://github.com/kodebaseai/kodebase/commit/56a3e2eceef00cf3d058717c13ebc177dca0dbf2) Thanks [@migcarva](https://github.com/migcarva)! - Add GitPlatformAdapter interface and align platform types

  **@kodebase/git-ops (NEW PACKAGE)**

  - Add GitPlatformAdapter interface with 11 methods for PR operations, auth validation, and branch management
  - Add core types: PRCreateOptions, PRInfo, Branch, AuthStatus
  - Add platform constants: CGitPlatform, CMergeMethod, CPRState, CReviewStatus
  - Comprehensive JSDoc documentation with examples for all methods
  - Support for GitHub, GitLab, and Bitbucket platforms
  - 8 passing tests validating interface implementability

  **@kodebase/config**

  - Add dependency on @kodebase/git-ops
  - Import TGitPlatform from git-ops as canonical platform type
  - Deprecate PlatformType in favor of TGitPlatform
  - Re-export TGitPlatform for convenience

- Updated dependencies [[`56a3e2e`](https://github.com/kodebaseai/kodebase/commit/56a3e2eceef00cf3d058717c13ebc177dca0dbf2), [`d0da952`](https://github.com/kodebaseai/kodebase/commit/d0da952d090ae12d3f1f2656db319e77f58e9d75)]:
  - @kodebase/git-ops@0.2.0

## 0.2.0

### Minor Changes

- [#128](https://github.com/kodebaseai/kodebase/pull/128) [`cf52182`](https://github.com/kodebaseai/kodebase/commit/cf52182d5ad0a8415b760811e94ceec2d4f73cbf) Thanks [@migcarva](https://github.com/migcarva)! - Add @kodebase/config package with comprehensive configuration system

  Implement complete configuration package with Zod validation, presets, and migration support:

  - **Configuration Schema**: Comprehensive Zod schemas covering all git operations (post-merge, hooks, validation, platform, cascades, branches, commits, PR creation)
  - **Config Loading**: loadConfig() with YAML parsing, validation, and detailed error messages
  - **Defaults**: getDefaultConfig() provides sensible zero-config defaults for immediate use
  - **Validation**: validateConfig() enables programmatic config validation with full type safety
  - **Workflow Presets**: Three production-ready presets - solo (fast/minimal), small_team (balanced), enterprise (strict/safe)
  - **Migration Framework**: detectVersion() and migrateConfig() for future version upgrades (v1.0 support)
  - **Documentation**: Comprehensive README, full JSDoc coverage, TypeDoc integration with 0 warnings
  - **Testing**: 140 tests with 100% coverage (statements, branches, functions, lines)
  - **Integration Tests**: 25 E2E tests validating real-world usage scenarios
  - **Public API**: Complete exports - loadConfig, validateConfig, presets, types, migration utilities

  This enables git-ops, CLI, and future extensions to consume shared, validated configuration with .kodebase/config/settings.yml support.

# @kodebase/config

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

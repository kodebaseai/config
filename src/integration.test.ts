/**
 * Integration tests for @kodebase/config package.
 *
 * End-to-end tests covering:
 * - Loading configuration from actual YAML files
 * - Preset validation and usage
 * - Error handling with intentional validation failures
 * - Public API exports
 */

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  ConfigLoadError,
  DEFAULT_CONFIG_PATH,
  defaultPreset,
  enterprisePreset,
  getDefaultConfig,
  loadConfig,
  presets,
  smallTeamPreset,
  soloPreset,
  validateConfig,
} from "./index.js";

describe("Integration Tests", () => {
  let testDir: string;

  beforeEach(() => {
    testDir = join(tmpdir(), `kodebase-integration-test-${Date.now()}`);
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (testDir) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe("E2E: Load config from settings.yml", () => {
    it("loads and validates a complete settings.yml file", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });

      // Write a realistic configuration file
      writeFileSync(
        join(configPath, "settings.yml"),
        `
version: "1.0"
artifactsDir: ".kodebase/artifacts"

gitOps:
  post_merge:
    strategy: cascade_pr
    cascade_pr:
      auto_merge: true
      require_checks: true
      labels:
        - automated
        - cascade
      branch_prefix: "cascade/"
      delete_branch: true

  post_checkout:
    create_draft_pr: true
    auto_assign: true
    auto_add_labels: true
    pr_template: default

  hooks:
    enabled: true
    non_blocking: false
    pre_commit:
      enabled: true
      validate_schema: true
      validate_state_machine: true
      non_blocking: false

  platform:
    type: github
    auth_strategy: auto

  validation:
    enforce_schema: true
    enforce_state_machine: true
    enforce_dependencies: true
`,
      );

      const config = await loadConfig(testDir);

      // Verify structure
      expect(config.version).toBe("1.0");
      expect(config.artifactsDir).toBe(".kodebase/artifacts");

      // Verify gitOps settings
      expect(config.gitOps?.post_merge?.strategy).toBe("cascade_pr");
      expect(config.gitOps?.post_merge?.cascade_pr?.auto_merge).toBe(true);
      expect(config.gitOps?.post_merge?.cascade_pr?.labels).toContain(
        "automated",
      );

      // Verify hooks
      expect(config.gitOps?.hooks?.enabled).toBe(true);
      expect(config.gitOps?.hooks?.non_blocking).toBe(false);
      expect(config.gitOps?.hooks?.pre_commit?.validate_schema).toBe(true);

      // Verify validation
      expect(config.gitOps?.validation?.enforce_schema).toBe(true);
      expect(config.gitOps?.validation?.enforce_state_machine).toBe(true);
      expect(config.gitOps?.validation?.enforce_dependencies).toBe(true);
    });

    it("falls back to defaults when settings.yml doesn't exist", async () => {
      const config = await loadConfig(testDir);

      expect(config).toEqual(getDefaultConfig());
      expect(config.version).toBe("1.0");
      expect(config.artifactsDir).toBe(".kodebase/artifacts");
      expect(config.gitOps?.post_merge?.strategy).toBe("cascade_pr");
    });

    it("loads minimal configuration and applies defaults", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });

      writeFileSync(
        join(configPath, "settings.yml"),
        `
version: "1.0"
artifactsDir: "custom/artifacts"
gitOps:
  post_merge: {}
  platform: {}
`,
      );

      const config = await loadConfig(testDir);

      expect(config.artifactsDir).toBe("custom/artifacts");
      expect(config.gitOps?.post_merge?.strategy).toBe("cascade_pr");
      expect(config.gitOps?.platform?.type).toBe("github");
    });

    it("loads configuration from custom path", async () => {
      const customPath = "config/custom-settings.yml";
      const customDir = join(testDir, "config");
      mkdirSync(customDir, { recursive: true });

      writeFileSync(
        join(testDir, customPath),
        `
version: "1.0"
artifactsDir: "custom-path"
gitOps:
  post_merge:
    strategy: direct_commit
`,
      );

      const config = await loadConfig(testDir, customPath);

      expect(config.artifactsDir).toBe("custom-path");
      expect(config.gitOps?.post_merge?.strategy).toBe("direct_commit");
    });
  });

  describe("E2E: Preset validation", () => {
    it("solo preset loads and validates successfully", () => {
      expect(() => validateConfig(soloPreset)).not.toThrow();

      expect(soloPreset.version).toBe("1.0");
      expect(soloPreset.gitOps?.post_merge?.strategy).toBe("direct_commit");
      expect(soloPreset.gitOps?.post_checkout?.create_draft_pr).toBe(false);
    });

    it("small_team preset loads and validates successfully", () => {
      expect(() => validateConfig(smallTeamPreset)).not.toThrow();

      expect(smallTeamPreset.version).toBe("1.0");
      expect(smallTeamPreset.gitOps?.post_merge?.strategy).toBe("cascade_pr");
      expect(smallTeamPreset.gitOps?.post_merge?.cascade_pr?.auto_merge).toBe(
        true,
      );
    });

    it("enterprise preset loads and validates successfully", () => {
      expect(() => validateConfig(enterprisePreset)).not.toThrow();

      expect(enterprisePreset.version).toBe("1.0");
      expect(enterprisePreset.gitOps?.post_merge?.cascade_pr?.auto_merge).toBe(
        false,
      );
      expect(enterprisePreset.gitOps?.hooks?.non_blocking).toBe(false);
    });

    it("default preset loads and validates successfully", () => {
      expect(() => validateConfig(defaultPreset)).not.toThrow();

      expect(defaultPreset.version).toBe("1.0");
      expect(defaultPreset.gitOps?.post_merge?.strategy).toBe("cascade_pr");
    });

    it("all presets in presets object validate successfully", () => {
      Object.entries(presets).forEach(([name, preset]) => {
        expect(
          () => validateConfig(preset),
          `Preset "${name}" should be valid`,
        ).not.toThrow();
      });
    });

    it("presets can be written to YAML and loaded back", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });

      // Write enterprise preset to file
      writeFileSync(
        join(configPath, "settings.yml"),
        `
version: "1.0"
artifactsDir: ".kodebase/artifacts"
gitOps:
  post_merge:
    strategy: cascade_pr
    cascade_pr:
      auto_merge: false
      require_checks: true
      labels: [requires-review, cascade]
  hooks:
    enabled: true
    non_blocking: false
  validation:
    enforce_schema: true
    enforce_state_machine: true
    enforce_dependencies: true
    error_on_warnings: true
`,
      );

      const config = await loadConfig(testDir);

      expect(config.gitOps?.post_merge?.cascade_pr?.auto_merge).toBe(false);
      expect(config.gitOps?.hooks?.non_blocking).toBe(false);
      expect(config.gitOps?.validation?.error_on_warnings).toBe(true);
    });
  });

  describe("E2E: Config validation with intentional errors", () => {
    it("throws ConfigLoadError for invalid YAML syntax", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });

      writeFileSync(
        join(configPath, "settings.yml"),
        `
version: "1.0
  this is: [invalid yaml
`,
      );

      await expect(loadConfig(testDir)).rejects.toThrow(ConfigLoadError);
      await expect(loadConfig(testDir)).rejects.toThrow(/Failed to parse YAML/);
    });

    it("throws ConfigLoadError for invalid enum values", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });

      writeFileSync(
        join(configPath, "settings.yml"),
        `
gitOps:
  post_merge:
    strategy: invalid_strategy_name
`,
      );

      await expect(loadConfig(testDir)).rejects.toThrow(ConfigLoadError);
      await expect(loadConfig(testDir)).rejects.toThrow(
        /Configuration validation failed/,
      );
    });

    it("throws ConfigLoadError for type mismatches", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });

      writeFileSync(
        join(configPath, "settings.yml"),
        `
gitOps:
  hooks:
    enabled: "not a boolean"
`,
      );

      await expect(loadConfig(testDir)).rejects.toThrow(ConfigLoadError);
      await expect(loadConfig(testDir)).rejects.toThrow(/enabled/);
    });

    it("throws ConfigLoadError with multiple validation errors", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });

      writeFileSync(
        join(configPath, "settings.yml"),
        `
gitOps:
  post_merge:
    strategy: bad_strategy
  platform:
    type: bad_platform
  cascades:
    batch_delay_seconds: -100
`,
      );

      try {
        await loadConfig(testDir);
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigLoadError);
        const message = (error as ConfigLoadError).message;
        expect(message).toContain("Configuration validation failed");
        expect(message).toContain("gitOps.post_merge.strategy");
        expect(message).toContain("gitOps.platform.type");
      }
    });

    it("handles file system errors appropriately", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });

      // Create a directory where the file should be
      const settingsPath = join(configPath, "settings.yml");
      mkdirSync(settingsPath);

      await expect(loadConfig(testDir)).rejects.toThrow(ConfigLoadError);
      await expect(loadConfig(testDir)).rejects.toThrow(
        /Failed to load configuration/,
      );
    });
  });

  describe("E2E: API exports verification", () => {
    it("exports loadConfig function", () => {
      expect(typeof loadConfig).toBe("function");
      expect(loadConfig.name).toBe("loadConfig");
    });

    it("exports getDefaultConfig function", () => {
      expect(typeof getDefaultConfig).toBe("function");
      expect(getDefaultConfig.name).toBe("getDefaultConfig");
    });

    it("exports validateConfig function", () => {
      expect(typeof validateConfig).toBe("function");
      expect(validateConfig.name).toBe("validateConfig");
    });

    it("exports ConfigLoadError class", () => {
      expect(ConfigLoadError).toBeDefined();
      expect(new ConfigLoadError("test")).toBeInstanceOf(Error);
      expect(new ConfigLoadError("test").name).toBe("ConfigLoadError");
    });

    it("exports DEFAULT_CONFIG_PATH constant", () => {
      expect(DEFAULT_CONFIG_PATH).toBe(".kodebase/config/settings.yml");
    });

    it("exports all presets", () => {
      expect(presets).toBeDefined();
      expect(presets.solo).toBe(soloPreset);
      expect(presets.small_team).toBe(smallTeamPreset);
      expect(presets.enterprise).toBe(enterprisePreset);
      expect(presets.default).toBe(defaultPreset);
    });

    it("exports individual preset objects", () => {
      expect(soloPreset).toBeDefined();
      expect(smallTeamPreset).toBeDefined();
      expect(enterprisePreset).toBeDefined();
      expect(defaultPreset).toBeDefined();

      expect(soloPreset.version).toBe("1.0");
      expect(smallTeamPreset.version).toBe("1.0");
      expect(enterprisePreset.version).toBe("1.0");
      expect(defaultPreset.version).toBe("1.0");
    });
  });

  describe("E2E: Real-world usage scenarios", () => {
    it("scenario: solo developer workflow", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });

      // Solo developer wants fast, minimal overhead
      writeFileSync(
        join(configPath, "settings.yml"),
        `
version: "1.0"
artifactsDir: ".kodebase/artifacts"
gitOps:
  post_merge:
    strategy: direct_commit
    direct_commit:
      push_immediately: true
  post_checkout:
    create_draft_pr: false
  hooks:
    enabled: true
    non_blocking: true
`,
      );

      const config = await loadConfig(testDir);

      expect(config.gitOps?.post_merge?.strategy).toBe("direct_commit");
      expect(config.gitOps?.post_merge?.direct_commit?.push_immediately).toBe(
        true,
      );
      expect(config.gitOps?.post_checkout?.create_draft_pr).toBe(false);
      expect(config.gitOps?.hooks?.non_blocking).toBe(true);
    });

    it("scenario: small team with automation", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });

      writeFileSync(
        join(configPath, "settings.yml"),
        `
version: "1.0"
artifactsDir: ".kodebase/artifacts"
gitOps:
  post_merge:
    strategy: cascade_pr
    cascade_pr:
      auto_merge: true
      require_checks: true
  post_checkout:
    create_draft_pr: true
    auto_assign: true
  hooks:
    enabled: true
    non_blocking: true
`,
      );

      const config = await loadConfig(testDir);

      expect(config.gitOps?.post_merge?.cascade_pr?.auto_merge).toBe(true);
      expect(config.gitOps?.post_checkout?.create_draft_pr).toBe(true);
      expect(config.gitOps?.hooks?.non_blocking).toBe(true);
    });

    it("scenario: enterprise with strict controls", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });

      writeFileSync(
        join(configPath, "settings.yml"),
        `
version: "1.0"
artifactsDir: ".kodebase/artifacts"
gitOps:
  post_merge:
    strategy: cascade_pr
    cascade_pr:
      auto_merge: false
      require_checks: true
  hooks:
    enabled: true
    non_blocking: false
  validation:
    enforce_schema: true
    enforce_state_machine: true
    enforce_dependencies: true
    error_on_warnings: true
  cascades:
    mode: batched
    require_confirmation: true
`,
      );

      const config = await loadConfig(testDir);

      expect(config.gitOps?.post_merge?.cascade_pr?.auto_merge).toBe(false);
      expect(config.gitOps?.hooks?.non_blocking).toBe(false);
      expect(config.gitOps?.validation?.error_on_warnings).toBe(true);
      expect(config.gitOps?.cascades?.mode).toBe("batched");
    });
  });
});

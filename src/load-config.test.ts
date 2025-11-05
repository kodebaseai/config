/**
 * Tests for configuration loading.
 */

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  ConfigLoadError,
  DEFAULT_CONFIG_PATH,
  getDefaultConfig,
  loadConfig,
} from "./load-config.js";

describe("getDefaultConfig", () => {
  it("returns default configuration", () => {
    const config = getDefaultConfig();

    expect(config.version).toBe("1.0");
    expect(config.artifactsDir).toBe(".kodebase/artifacts");
    expect(config.gitOps?.post_merge?.strategy).toBe("cascade_pr");
    expect(config.gitOps?.platform?.type).toBe("github");
  });

  it("returns a new copy each time", () => {
    const config1 = getDefaultConfig();
    const config2 = getDefaultConfig();

    expect(config1).not.toBe(config2);
    expect(config1).toEqual(config2);
  });
});

describe("loadConfig", () => {
  let testDir: string;

  beforeEach(() => {
    testDir = join(tmpdir(), `kodebase-config-test-${Date.now()}`);
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (testDir) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe("file not found", () => {
    it("returns default config when config file doesn't exist", async () => {
      const config = await loadConfig(testDir);

      expect(config.version).toBe("1.0");
      expect(config.artifactsDir).toBe(".kodebase/artifacts");
      expect(config.gitOps?.post_merge?.strategy).toBe("cascade_pr");
    });

    it("returns default config with custom path when file doesn't exist", async () => {
      const config = await loadConfig(testDir, "custom-config.yml");

      expect(config).toEqual(getDefaultConfig());
    });
  });

  describe("valid configurations", () => {
    it("loads minimal valid configuration", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      writeFileSync(
        join(configPath, "settings.yml"),
        `
version: "1.0"
artifactsDir: ".kodebase/artifacts"
`,
      );

      const config = await loadConfig(testDir);

      expect(config.version).toBe("1.0");
      expect(config.artifactsDir).toBe(".kodebase/artifacts");
    });

    it("loads configuration with gitOps settings", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      writeFileSync(
        join(configPath, "settings.yml"),
        `
version: "1.0"
artifactsDir: "custom/path"
gitOps:
  post_merge:
    strategy: direct_commit
    direct_commit:
      commit_prefix: "auto: "
      push_immediately: false
  platform:
    type: gitlab
    auth_strategy: token
`,
      );

      const config = await loadConfig(testDir);

      expect(config.artifactsDir).toBe("custom/path");
      expect(config.gitOps?.post_merge?.strategy).toBe("direct_commit");
      expect(config.gitOps?.post_merge?.direct_commit?.push_immediately).toBe(
        false,
      );
      expect(config.gitOps?.platform?.type).toBe("gitlab");
    });

    it("loads configuration from custom path", async () => {
      const customPath = "my-config.yml";
      writeFileSync(
        join(testDir, customPath),
        `
version: "1.0"
artifactsDir: "custom-artifacts"
`,
      );

      const config = await loadConfig(testDir, customPath);

      expect(config.artifactsDir).toBe("custom-artifacts");
    });

    it("applies defaults for missing optional fields", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      writeFileSync(
        join(configPath, "settings.yml"),
        `
gitOps:
  post_merge: {}
`,
      );

      const config = await loadConfig(testDir);

      expect(config.version).toBe("1.0");
      expect(config.artifactsDir).toBe(".kodebase/artifacts");
      expect(config.gitOps?.post_merge?.strategy).toBe("cascade_pr");
    });

    it("loads configuration with all sections", async () => {
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
      labels: [automated, cascade]
  post_checkout:
    create_draft_pr: true
    pr_template: default
  hooks:
    enabled: true
    non_blocking: false
  platform:
    type: github
    auth_strategy: auto
  cascades:
    mode: batched
    batch_delay_seconds: 60
`,
      );

      const config = await loadConfig(testDir);

      expect(config.gitOps?.post_merge?.cascade_pr?.auto_merge).toBe(true);
      expect(config.gitOps?.hooks?.non_blocking).toBe(false);
      expect(config.gitOps?.cascades?.mode).toBe("batched");
      expect(config.gitOps?.cascades?.batch_delay_seconds).toBe(60);
    });
  });

  describe("YAML parsing errors", () => {
    it("throws ConfigLoadError on invalid YAML syntax", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      writeFileSync(
        join(configPath, "settings.yml"),
        `
version: "1.0
  invalid: yaml: syntax
`,
      );

      await expect(loadConfig(testDir)).rejects.toThrow(ConfigLoadError);
      await expect(loadConfig(testDir)).rejects.toThrow(
        /Failed to parse YAML configuration/,
      );
    });

    it("includes YAML error details in error message", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      writeFileSync(
        join(configPath, "settings.yml"),
        `
version: [unclosed
`,
      );

      try {
        await loadConfig(testDir);
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigLoadError);
        expect((error as ConfigLoadError).message).toContain(
          "Failed to parse YAML",
        );
        expect((error as ConfigLoadError).cause).toBeDefined();
      }
    });
  });

  describe("validation errors", () => {
    it("throws ConfigLoadError on invalid enum value", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      writeFileSync(
        join(configPath, "settings.yml"),
        `
gitOps:
  post_merge:
    strategy: invalid_strategy
`,
      );

      await expect(loadConfig(testDir)).rejects.toThrow(ConfigLoadError);
      await expect(loadConfig(testDir)).rejects.toThrow(
        /Configuration validation failed/,
      );
    });

    it("provides detailed validation error messages", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      writeFileSync(
        join(configPath, "settings.yml"),
        `
gitOps:
  post_merge:
    strategy: invalid_value
  platform:
    type: unsupported_platform
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

    it("throws ConfigLoadError on type mismatch", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      writeFileSync(
        join(configPath, "settings.yml"),
        `
gitOps:
  hooks:
    enabled: not_a_boolean
`,
      );

      await expect(loadConfig(testDir)).rejects.toThrow(ConfigLoadError);
      await expect(loadConfig(testDir)).rejects.toThrow(/enabled/);
    });

    it("throws ConfigLoadError on invalid number range", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      writeFileSync(
        join(configPath, "settings.yml"),
        `
gitOps:
  cascades:
    batch_delay_seconds: -1
`,
      );

      await expect(loadConfig(testDir)).rejects.toThrow(ConfigLoadError);
      await expect(loadConfig(testDir)).rejects.toThrow(
        /Configuration validation failed/,
      );
    });

    it("throws ConfigLoadError on invalid URL format", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      writeFileSync(
        join(configPath, "settings.yml"),
        `
gitOps:
  platform:
    github:
      api_url: not-a-valid-url
`,
      );

      await expect(loadConfig(testDir)).rejects.toThrow(ConfigLoadError);
      await expect(loadConfig(testDir)).rejects.toThrow(/api_url/);
    });
  });

  describe("error handling", () => {
    it("handles non-Error thrown during YAML parsing", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      // Write content that causes YAML parser to throw non-Error
      writeFileSync(join(configPath, "settings.yml"), "\t\t\tinvalid");

      await expect(loadConfig(testDir)).rejects.toThrow(ConfigLoadError);
    });

    it("handles non-Error thrown during file operations", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      // Create a directory instead of a file to cause read error
      mkdirSync(join(configPath, "settings.yml"));

      await expect(loadConfig(testDir)).rejects.toThrow(ConfigLoadError);
      await expect(loadConfig(testDir)).rejects.toThrow(
        /Failed to load configuration/,
      );
    });

    it("ConfigLoadError includes cause property", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      writeFileSync(join(configPath, "settings.yml"), "invalid: yaml: [syntax");

      try {
        await loadConfig(testDir);
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigLoadError);
        expect((error as ConfigLoadError).name).toBe("ConfigLoadError");
        expect((error as ConfigLoadError).cause).toBeDefined();
      }
    });

    it("preserves path in error messages", async () => {
      const customPath = "custom/config.yml";
      const fullPath = join(testDir, "custom");
      mkdirSync(fullPath, { recursive: true });
      writeFileSync(join(testDir, customPath), "invalid yaml [syntax");

      try {
        await loadConfig(testDir, customPath);
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigLoadError);
        expect((error as ConfigLoadError).message).toContain(customPath);
      }
    });

    it("wraps file system errors other than ENOENT", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      const settingsPath = join(configPath, "settings.yml");

      // Create a directory where the file should be (will cause EISDIR error)
      mkdirSync(settingsPath, { recursive: true });

      try {
        await loadConfig(testDir);
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigLoadError);
        expect((error as ConfigLoadError).message).toContain(
          "Failed to load configuration",
        );
        expect((error as ConfigLoadError).cause).toBeDefined();
      }
    });

    it("handles errors with non-Error objects", async () => {
      const configPath = join(testDir, ".kodebase/config");
      mkdirSync(configPath, { recursive: true });
      const settingsPath = join(configPath, "settings.yml");

      // Create a directory instead of file to trigger error
      mkdirSync(settingsPath);

      try {
        await loadConfig(testDir);
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigLoadError);
        expect((error as ConfigLoadError).message).toContain("Failed to load");
      }
    });
  });

  describe("DEFAULT_CONFIG_PATH constant", () => {
    it("exports correct default path", () => {
      expect(DEFAULT_CONFIG_PATH).toBe(".kodebase/config/settings.yml");
    });
  });
});

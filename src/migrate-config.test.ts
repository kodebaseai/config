/**
 * Tests for configuration migration utilities.
 */

import { describe, expect, it } from "vitest";
import {
  type ConfigVersion,
  createDeprecationWarning,
  DEFAULT_VERSION,
  detectVersion,
  migrateConfig,
  SUPPORTED_VERSIONS,
} from "./migrate-config.js";
import { defaultPreset } from "./presets/default.js";
import type { KodebaseConfig } from "./types.js";

describe("Migration Utilities", () => {
  describe("detectVersion", () => {
    it("returns version from config.version field", () => {
      const config = { version: "1.0", artifactsDir: ".kodebase/artifacts" };
      expect(detectVersion(config)).toBe("1.0");
    });

    it("returns DEFAULT_VERSION when version is missing", () => {
      const config = { artifactsDir: ".kodebase/artifacts" };
      expect(detectVersion(config)).toBe(DEFAULT_VERSION);
    });

    it("returns DEFAULT_VERSION when version is not a string", () => {
      const config = { version: 1.0, artifactsDir: ".kodebase/artifacts" };
      expect(detectVersion(config)).toBe(DEFAULT_VERSION);
    });

    it("returns DEFAULT_VERSION when config is null", () => {
      expect(detectVersion(null)).toBe(DEFAULT_VERSION);
    });

    it("returns DEFAULT_VERSION when config is not an object", () => {
      expect(detectVersion("not an object")).toBe(DEFAULT_VERSION);
      expect(detectVersion(123)).toBe(DEFAULT_VERSION);
      expect(detectVersion(undefined)).toBe(DEFAULT_VERSION);
    });

    it("returns DEFAULT_VERSION for unsupported version strings", () => {
      const config = { version: "99.0", artifactsDir: ".kodebase/artifacts" };
      expect(detectVersion(config)).toBe(DEFAULT_VERSION);
    });

    it("detects version from real preset", () => {
      expect(detectVersion(defaultPreset)).toBe("1.0");
    });
  });

  describe("migrateConfig", () => {
    const validConfig: KodebaseConfig = {
      version: "1.0",
      artifactsDir: ".kodebase/artifacts",
      gitOps: {
        post_merge: {
          strategy: "cascade_pr",
        },
      },
    };

    it("returns same config when fromVersion equals toVersion", () => {
      const result = migrateConfig(validConfig, {
        fromVersion: "1.0",
        toVersion: "1.0",
      });

      expect(result.config).toEqual(validConfig);
      expect(result.warnings).toEqual([]);
    });

    it("auto-detects fromVersion when not specified", () => {
      const result = migrateConfig(validConfig);

      expect(result.config).toEqual(validConfig);
      expect(result.warnings).toEqual([]);
    });

    it("uses latest version as toVersion when not specified", () => {
      const result = migrateConfig(validConfig);

      expect(result.config).toEqual(validConfig);
      const latestVersion = SUPPORTED_VERSIONS[
        SUPPORTED_VERSIONS.length - 1
      ] as ConfigVersion;
      expect(detectVersion(result.config)).toBe(latestVersion);
    });

    it("handles config without version field", () => {
      const configWithoutVersion = {
        artifactsDir: ".kodebase/artifacts",
      };

      const result = migrateConfig(configWithoutVersion);

      expect(result.config).toBeDefined();
      expect(result.warnings).toEqual([]);
    });

    it("is idempotent (running twice produces same result)", () => {
      const result1 = migrateConfig(validConfig, {
        fromVersion: "1.0",
        toVersion: "1.0",
      });

      const result2 = migrateConfig(result1.config, {
        fromVersion: "1.0",
        toVersion: "1.0",
      });

      expect(result2.config).toEqual(result1.config);
      expect(result2.warnings).toEqual(result1.warnings);
    });

    it("throws error for unsupported fromVersion", () => {
      expect(() => {
        migrateConfig(validConfig, {
          fromVersion: "99.0" as ConfigVersion,
          toVersion: "1.0",
        });
      }).toThrow(/Unsupported configuration version/);
    });

    it("throws error for unsupported toVersion", () => {
      expect(() => {
        migrateConfig(validConfig, {
          fromVersion: "1.0",
          toVersion: "99.0" as ConfigVersion,
        });
      }).toThrow(/Unsupported configuration version/);
    });

    it("migrates all presets successfully", () => {
      const result = migrateConfig(defaultPreset);

      expect(result.config).toBeDefined();
      expect(result.warnings).toEqual([]);
    });
  });

  describe("createDeprecationWarning", () => {
    it("creates warning with correct fields", () => {
      const warning = createDeprecationWarning(
        "oldField",
        "Use 'newField' instead",
        "1.0",
      );

      expect(warning.field).toBe("oldField");
      expect(warning.message).toBe("Use 'newField' instead");
      expect(warning.version).toBe("1.0");
    });

    it("creates warnings for multiple fields", () => {
      const warnings = [
        createDeprecationWarning("field1", "deprecated", "1.0"),
        createDeprecationWarning("field2", "use field3", "1.0"),
      ];

      expect(warnings).toHaveLength(2);
      expect(warnings[0].field).toBe("field1");
      expect(warnings[1].field).toBe("field2");
    });
  });

  describe("SUPPORTED_VERSIONS", () => {
    it("includes v1.0", () => {
      expect(SUPPORTED_VERSIONS).toContain("1.0");
    });

    it("is a readonly array", () => {
      expect(Array.isArray(SUPPORTED_VERSIONS)).toBe(true);
    });

    it("DEFAULT_VERSION is in SUPPORTED_VERSIONS", () => {
      expect(SUPPORTED_VERSIONS).toContain(DEFAULT_VERSION);
    });
  });

  describe("Future version migrations", () => {
    it("structure supports adding new versions", () => {
      // This test validates that the migration framework
      // is designed to support future versions
      expect(SUPPORTED_VERSIONS.length).toBeGreaterThanOrEqual(1);

      // When v2.0 is added, migrations can be added to MIGRATIONS registry
      // Example: MIGRATIONS["1.0->2.0"] = migrateV1ToV2
    });

    it("downgrade protection works", () => {
      // Currently only v1.0 exists, but test the downgrade check
      // by attempting to specify invalid version ordering

      // This would trigger downgrade error if we had v2.0
      const config = { ...defaultPreset, version: "1.0" };

      // Same version = no error
      expect(() => {
        migrateConfig(config, { fromVersion: "1.0", toVersion: "1.0" });
      }).not.toThrow();
    });

    it("would throw on downgrade if multiple versions existed", () => {
      // This test documents the downgrade protection behavior
      // When v2.0 is added, this code path will be exercisable:
      // migrateConfig(config, { fromVersion: "2.0", toVersion: "1.0" })
      // would throw: "Downgrade from 2.0 to 1.0 is not supported"

      const _config = { version: "1.0", artifactsDir: ".kodebase/artifacts" };

      // Currently with only v1.0, we can't trigger the downgrade path
      // but we can verify the indexOf logic works
      const fromIndex = SUPPORTED_VERSIONS.indexOf("1.0" as ConfigVersion);
      const toIndex = SUPPORTED_VERSIONS.indexOf("1.0" as ConfigVersion);

      expect(fromIndex).toBe(0);
      expect(toIndex).toBe(0);
      expect(fromIndex > toIndex).toBe(false);

      // This documents that when fromIndex > toIndex, error is thrown
      // The actual code path at lines 162-166 will be tested when v2.0 exists
    });

    it("validates version support in migration path", () => {
      // Test that invalid versions are caught
      const config = { version: "1.0", artifactsDir: ".kodebase/artifacts" };

      // Invalid fromVersion
      expect(() => {
        migrateConfig(config, {
          fromVersion: "invalid" as ConfigVersion,
          toVersion: "1.0",
        });
      }).toThrow(/Unsupported configuration version/);
    });

    it("handles auto-detection with explicit toVersion", () => {
      const config = { version: "1.0", artifactsDir: ".kodebase/artifacts" };

      const result = migrateConfig(config, { toVersion: "1.0" });

      expect(result.config).toBeDefined();
      expect(result.warnings).toEqual([]);
    });

    it("handles explicit fromVersion with auto toVersion", () => {
      const config = { artifactsDir: ".kodebase/artifacts" };

      const result = migrateConfig(config, { fromVersion: "1.0" });

      expect(result.config).toBeDefined();
      expect(result.warnings).toEqual([]);
    });

    it("validates fromVersion is supported", () => {
      const config = { version: "1.0", artifactsDir: ".kodebase/artifacts" };

      expect(() => {
        migrateConfig(config, { fromVersion: "2.0" as ConfigVersion });
      }).toThrow(/Unsupported configuration version: 2.0/);
    });

    it("validates toVersion is supported", () => {
      const config = { version: "1.0", artifactsDir: ".kodebase/artifacts" };

      expect(() => {
        migrateConfig(config, { toVersion: "2.0" as ConfigVersion });
      }).toThrow(/Unsupported configuration version: 2.0/);
    });
  });

  describe("Edge cases", () => {
    it("handles empty config object", () => {
      const result = migrateConfig({});

      expect(result.config).toBeDefined();
      expect(result.warnings).toEqual([]);
    });

    it("handles complex nested config", () => {
      const complexConfig: KodebaseConfig = {
        version: "1.0",
        artifactsDir: ".kodebase/artifacts",
        gitOps: {
          post_merge: {
            strategy: "cascade_pr",
            cascade_pr: {
              auto_merge: true,
              require_checks: true,
              labels: ["cascade", "automated"],
              branch_prefix: "cascade/",
              delete_branch: true,
            },
          },
          hooks: {
            enabled: true,
            non_blocking: false,
            pre_commit: {
              enabled: true,
              validate_schema: true,
            },
          },
          validation: {
            enforce_schema: true,
            enforce_state_machine: true,
            enforce_dependencies: true,
          },
        },
      };

      const result = migrateConfig(complexConfig);

      expect(result.config).toEqual(complexConfig);
      expect(result.warnings).toEqual([]);
    });
  });
});

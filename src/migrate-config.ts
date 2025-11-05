/**
 * Configuration migration utilities for version upgrades.
 *
 * This module provides a framework for migrating configurations between versions.
 * Currently supports v1.0 only (no-op migrations), but provides structure for
 * future version migrations.
 */

import type { KodebaseConfig } from "./types.js";

/**
 * Version string for configuration files.
 */
export type ConfigVersion = "1.0";

/**
 * Supported configuration versions.
 */
export const SUPPORTED_VERSIONS: readonly ConfigVersion[] = ["1.0"] as const;

/**
 * Default version assumed when config.version is missing.
 */
export const DEFAULT_VERSION: ConfigVersion = "1.0";

/**
 * Deprecation warnings collected during migration.
 */
export interface DeprecationWarning {
  /** The deprecated field name */
  field: string;
  /** Human-readable deprecation message */
  message: string;
  /** Version where the field was deprecated */
  version: ConfigVersion;
}

/**
 * Result of a migration operation.
 */
export interface MigrationResult {
  /** The migrated configuration */
  config: KodebaseConfig;
  /** Any deprecation warnings encountered */
  warnings: DeprecationWarning[];
}

/**
 * Detects the version of a configuration object.
 *
 * @param config - The configuration object to inspect
 * @returns The detected version or DEFAULT_VERSION if not specified
 *
 * @example
 * ```typescript
 * const version = detectVersion({ version: "1.0", artifactsDir: "..." });
 * // => "1.0"
 *
 * const defaultVersion = detectVersion({ artifactsDir: "..." });
 * // => "1.0" (default)
 * ```
 */
export function detectVersion(config: unknown): ConfigVersion {
  if (
    typeof config === "object" &&
    config !== null &&
    "version" in config &&
    typeof config.version === "string"
  ) {
    const version = config.version;
    if (SUPPORTED_VERSIONS.includes(version as ConfigVersion)) {
      return version as ConfigVersion;
    }
  }
  return DEFAULT_VERSION;
}

/**
 * Validates that a version is supported.
 *
 * @param version - The version to validate
 * @throws {Error} If the version is not supported
 */
function validateVersion(version: string): asserts version is ConfigVersion {
  if (!SUPPORTED_VERSIONS.includes(version as ConfigVersion)) {
    throw new Error(
      `Unsupported configuration version: ${version}. Supported versions: ${SUPPORTED_VERSIONS.join(", ")}`,
    );
  }
}

/**
 * Migrates a configuration from one version to another.
 *
 * This function is idempotent - running it multiple times with the same
 * input will produce the same result with no additional side effects.
 *
 * @param config - The configuration to migrate
 * @param options - Migration options
 * @param options.fromVersion - Source version (auto-detected if omitted)
 * @param options.toVersion - Target version (defaults to latest supported)
 * @returns Migration result with config and any deprecation warnings
 *
 * @throws {Error} If fromVersion or toVersion is unsupported
 *
 * @example
 * ```typescript
 * // Migrate from detected version to latest
 * const result = migrateConfig(oldConfig);
 *
 * // Explicit version migration
 * const result = migrateConfig(oldConfig, {
 *   fromVersion: "1.0",
 *   toVersion: "1.0"
 * });
 *
 * // Check for warnings
 * if (result.warnings.length > 0) {
 *   console.warn("Deprecation warnings:", result.warnings);
 * }
 * ```
 */
export function migrateConfig(
  config: unknown,
  options: {
    fromVersion?: ConfigVersion;
    toVersion?: ConfigVersion;
  } = {},
): MigrationResult {
  const fromVersion = options.fromVersion ?? detectVersion(config);
  const toVersion =
    options.toVersion ??
    (SUPPORTED_VERSIONS[SUPPORTED_VERSIONS.length - 1] as ConfigVersion);

  validateVersion(fromVersion);
  validateVersion(toVersion);

  const warnings: DeprecationWarning[] = [];

  // Currently only v1.0 exists, so no migration needed
  // When v2.0 is added, implement version upgrade logic here
  return {
    config: config as KodebaseConfig,
    warnings,
  };
}

/**
 * Creates a deprecation warning.
 *
 * @param field - The deprecated field name
 * @param message - Human-readable deprecation message
 * @param version - Version where the field was deprecated
 * @returns A deprecation warning object
 *
 * @example
 * ```typescript
 * const warning = createDeprecationWarning(
 *   "oldField",
 *   "Use 'newField' instead",
 *   "2.0"
 * );
 * console.warn(`[Deprecated in v${warning.version}] ${warning.field}: ${warning.message}`);
 * ```
 */
export function createDeprecationWarning(
  field: string,
  message: string,
  version: ConfigVersion,
): DeprecationWarning {
  return { field, message, version };
}

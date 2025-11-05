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
export declare const SUPPORTED_VERSIONS: readonly ConfigVersion[];
/**
 * Default version assumed when config.version is missing.
 */
export declare const DEFAULT_VERSION: ConfigVersion;
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
export declare function detectVersion(config: unknown): ConfigVersion;
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
export declare function migrateConfig(config: unknown, options?: {
    fromVersion?: ConfigVersion;
    toVersion?: ConfigVersion;
}): MigrationResult;
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
export declare function createDeprecationWarning(field: string, message: string, version: ConfigVersion): DeprecationWarning;
//# sourceMappingURL=migrate-config.d.ts.map
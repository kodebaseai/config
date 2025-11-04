/**
 * Configuration loading functions.
 */
import type { KodebaseConfig } from "./types.js";
/**
 * Default configuration file path relative to project root.
 */
export declare const DEFAULT_CONFIG_PATH = ".kodebase/config/settings.yml";
/**
 * Configuration loading error.
 */
export declare class ConfigLoadError extends Error {
    readonly cause?: unknown | undefined;
    constructor(message: string, cause?: unknown | undefined);
}
/**
 * Returns the default Kodebase configuration.
 *
 * @returns Default configuration with sensible defaults
 *
 * @example
 * ```typescript
 * const config = getDefaultConfig();
 * console.log(config.gitOps?.post_merge?.strategy); // "cascade_pr"
 * ```
 */
export declare function getDefaultConfig(): KodebaseConfig;
/**
 * Loads Kodebase configuration from the project root.
 *
 * Attempts to load configuration from `.kodebase/config/settings.yml`.
 * Falls back to defaults if file doesn't exist.
 * Validates configuration with Zod schema and provides detailed error messages.
 *
 * @param projectRoot - Path to the project root directory
 * @param configPath - Optional custom configuration file path (relative to project root)
 * @returns The loaded and validated configuration
 * @throws {ConfigLoadError} If configuration file exists but cannot be parsed or validated
 *
 * @example
 * ```typescript
 * // Load with defaults if config file doesn't exist
 * const config = await loadConfig("/path/to/project");
 *
 * // Load with custom config path
 * const config = await loadConfig("/path/to/project", "custom-config.yml");
 * ```
 */
export declare function loadConfig(projectRoot: string, configPath?: string): Promise<KodebaseConfig>;
//# sourceMappingURL=load-config.d.ts.map
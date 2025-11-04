/**
 * Configuration loading functions.
 */
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parse as parseYAML } from "yaml";
import { defaultPreset } from "./presets/default.js";
import { validateConfig } from "./validate-config.js";
/**
 * Default configuration file path relative to project root.
 */
export const DEFAULT_CONFIG_PATH = ".kodebase/config/settings.yml";
/**
 * Configuration loading error.
 */
export class ConfigLoadError extends Error {
    cause;
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = "ConfigLoadError";
    }
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
export function getDefaultConfig() {
    return { ...defaultPreset };
}
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
export async function loadConfig(projectRoot, configPath = DEFAULT_CONFIG_PATH) {
    const absoluteProjectRoot = resolve(projectRoot);
    const absoluteConfigPath = join(absoluteProjectRoot, configPath);
    // If config file doesn't exist, return defaults
    if (!existsSync(absoluteConfigPath)) {
        return getDefaultConfig();
    }
    try {
        // Read and parse YAML file
        const fileContents = await readFile(absoluteConfigPath, "utf-8");
        let parsed;
        try {
            parsed = parseYAML(fileContents);
        }
        catch (error) {
            throw new ConfigLoadError(`Failed to parse YAML configuration file at ${configPath}: ${error instanceof Error ? error.message : String(error)}`, error);
        }
        // Validate with Zod schema
        try {
            return validateConfig(parsed);
        }
        catch (error) {
            // validateConfig only throws ZodError, but handle edge cases
            const zodError = error;
            const errorMessages = zodError.errors
                .map((err) => {
                const path = err.path.length > 0 ? err.path.join(".") : "root";
                return `  - ${path}: ${err.message}`;
            })
                .join("\n");
            throw new ConfigLoadError(`Configuration validation failed for ${configPath}:\n${errorMessages}`, error);
        }
    }
    catch (error) {
        // Re-throw ConfigLoadError as-is
        if (error instanceof ConfigLoadError) {
            throw error;
        }
        // Wrap other errors
        throw new ConfigLoadError(`Failed to load configuration from ${configPath}: ${error instanceof Error ? error.message : String(error)}`, error);
    }
}
//# sourceMappingURL=load-config.js.map
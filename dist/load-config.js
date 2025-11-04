/**
 * Configuration loading functions.
 */
/**
 * Loads Kodebase configuration from the project root.
 *
 * @param projectRoot - Path to the project root directory
 * @returns The loaded configuration
 *
 * @example
 * ```typescript
 * const config = await loadConfig("/path/to/project");
 * console.log(config.artifactsDir); // ".kodebase/artifacts"
 * ```
 */
export async function loadConfig(_projectRoot) {
    // Placeholder implementation - will be implemented in C.2.3
    return {
        artifactsDir: ".kodebase/artifacts",
        gitOps: {},
    };
}
//# sourceMappingURL=load-config.js.map
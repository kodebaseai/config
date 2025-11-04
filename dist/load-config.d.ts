/**
 * Configuration loading functions.
 */
import type { KodebaseConfig } from "./types.js";
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
export declare function loadConfig(_projectRoot: string): Promise<KodebaseConfig>;
//# sourceMappingURL=load-config.d.ts.map
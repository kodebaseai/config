/**
 * @kodebase/config
 *
 * Configuration system for Kodebase git operations.
 *
 * @packageDocumentation
 */
// Configuration loading and validation
export { ConfigLoadError, DEFAULT_CONFIG_PATH, getDefaultConfig, loadConfig, } from "./load-config.js";
// Presets
export { defaultPreset, enterprisePreset, presets, smallTeamPreset, soloPreset, } from "./presets/index.js";
export { validateConfig } from "./validate-config.js";
//# sourceMappingURL=index.js.map
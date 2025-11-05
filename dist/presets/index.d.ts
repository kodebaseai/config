/**
 * Configuration presets for different team sizes and workflows.
 *
 * @packageDocumentation
 */
/**
 * Collection of all available configuration presets.
 *
 * @example
 * ```typescript
 * import { presets } from "@kodebase/config";
 *
 * // Use solo preset for fast individual development
 * const config = presets.solo;
 *
 * // Use small_team preset for collaborative teams
 * const config = presets.small_team;
 *
 * // Use enterprise preset for large organizations
 * const config = presets.enterprise;
 * ```
 */
export { defaultPreset, defaultPreset as default } from "./default.js";
export { enterprisePreset, enterprisePreset as enterprise, } from "./enterprise.js";
export { smallTeamPreset, smallTeamPreset as small_team, } from "./small-team.js";
export { soloPreset, soloPreset as solo } from "./solo.js";
export type { ConfigPreset } from "./types.js";
/**
 * Named exports object containing all presets.
 */
export declare const presets: {
    readonly solo: import("../types.js").KodebaseConfig;
    readonly small_team: import("../types.js").KodebaseConfig;
    readonly enterprise: import("../types.js").KodebaseConfig;
    readonly default: import("../types.js").KodebaseConfig;
};
//# sourceMappingURL=index.d.ts.map
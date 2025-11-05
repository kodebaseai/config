/**
 * Configuration presets for different team sizes and workflows.
 *
 * @packageDocumentation
 */

import { defaultPreset } from "./default.js";
import { enterprisePreset } from "./enterprise.js";
import { smallTeamPreset } from "./small-team.js";
import { soloPreset } from "./solo.js";

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
export {
  enterprisePreset,
  enterprisePreset as enterprise,
} from "./enterprise.js";
export {
  smallTeamPreset,
  smallTeamPreset as small_team,
} from "./small-team.js";
export { soloPreset, soloPreset as solo } from "./solo.js";
export type { ConfigPreset } from "./types.js";

/**
 * Named exports object containing all presets.
 */
export const presets = {
  /** Solo developer preset for fast, minimal workflows */
  solo: soloPreset,
  /** Small team preset with balanced collaboration */
  small_team: smallTeamPreset,
  /** Enterprise preset with strict controls and safety */
  enterprise: enterprisePreset,
  /** Default preset (alias for solo) */
  default: defaultPreset,
} as const;

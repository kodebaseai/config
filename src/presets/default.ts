/**
 * Default configuration preset.
 */

import type { ConfigPreset } from "./types.js";

/**
 * Default Kodebase configuration preset.
 *
 * @example
 * ```typescript
 * import { defaultPreset } from "@kodebase/config";
 *
 * const config = { ...defaultPreset, artifactsDir: "custom/path" };
 * ```
 */
export const defaultPreset: ConfigPreset = {
  version: "1.0",
  artifactsDir: ".kodebase/artifacts",
  gitOps: {
    post_merge: {
      strategy: "cascade_pr",
    },
    post_checkout: {
      create_draft_pr: true,
    },
    hooks: {
      enabled: true,
      non_blocking: true,
    },
    platform: {
      type: "github",
      auth_strategy: "auto",
    },
  },
};

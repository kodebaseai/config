/**
 * Default configuration preset.
 */
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
export const defaultPreset = {
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
//# sourceMappingURL=default.js.map
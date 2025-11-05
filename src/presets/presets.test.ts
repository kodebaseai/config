/**
 * Tests for configuration presets.
 */

import { describe, expect, it } from "vitest";
import { validateConfig } from "../validate-config.js";
import { defaultPreset } from "./default.js";
import { enterprisePreset } from "./enterprise.js";
import { presets } from "./index.js";
import { smallTeamPreset } from "./small-team.js";
import { soloPreset } from "./solo.js";

describe("Presets", () => {
  describe("soloPreset", () => {
    it("has correct structure", () => {
      expect(soloPreset.version).toBe("1.0");
      expect(soloPreset.artifactsDir).toBe(".kodebase/artifacts");
      expect(soloPreset.gitOps).toBeDefined();
    });

    it("uses direct_commit strategy", () => {
      expect(soloPreset.gitOps?.post_merge?.strategy).toBe("direct_commit");
      expect(
        soloPreset.gitOps?.post_merge?.direct_commit?.push_immediately,
      ).toBe(true);
    });

    it("disables draft PRs", () => {
      expect(soloPreset.gitOps?.post_checkout?.create_draft_pr).toBe(false);
      expect(soloPreset.gitOps?.post_checkout?.auto_assign).toBe(false);
      expect(soloPreset.gitOps?.post_checkout?.notify_team).toBe(false);
    });

    it("uses non-blocking hooks", () => {
      expect(soloPreset.gitOps?.hooks?.enabled).toBe(true);
      expect(soloPreset.gitOps?.hooks?.non_blocking).toBe(true);
    });

    it("has minimal validation", () => {
      expect(soloPreset.gitOps?.validation?.enforce_schema).toBe(true);
      expect(soloPreset.gitOps?.validation?.enforce_state_machine).toBe(false);
      expect(soloPreset.gitOps?.validation?.enforce_dependencies).toBe(false);
      expect(soloPreset.gitOps?.validation?.allow_wip_commits).toBe(true);
    });

    it("uses immediate cascade mode", () => {
      expect(soloPreset.gitOps?.cascades?.mode).toBe("immediate");
      expect(soloPreset.gitOps?.cascades?.require_confirmation).toBe(false);
    });

    it("does not require PR for main", () => {
      expect(soloPreset.gitOps?.branches?.require_pr_for_main).toBe(false);
    });

    it("passes schema validation", () => {
      expect(() => validateConfig(soloPreset)).not.toThrow();
    });
  });

  describe("smallTeamPreset", () => {
    it("has correct structure", () => {
      expect(smallTeamPreset.version).toBe("1.0");
      expect(smallTeamPreset.artifactsDir).toBe(".kodebase/artifacts");
      expect(smallTeamPreset.gitOps).toBeDefined();
    });

    it("uses cascade_pr strategy with auto_merge", () => {
      expect(smallTeamPreset.gitOps?.post_merge?.strategy).toBe("cascade_pr");
      expect(smallTeamPreset.gitOps?.post_merge?.cascade_pr?.auto_merge).toBe(
        true,
      );
      expect(
        smallTeamPreset.gitOps?.post_merge?.cascade_pr?.require_checks,
      ).toBe(true);
    });

    it("enables draft PRs", () => {
      expect(smallTeamPreset.gitOps?.post_checkout?.create_draft_pr).toBe(true);
      expect(smallTeamPreset.gitOps?.post_checkout?.auto_assign).toBe(true);
      expect(smallTeamPreset.gitOps?.post_checkout?.auto_add_labels).toBe(true);
    });

    it("uses non-blocking hooks with validation", () => {
      expect(smallTeamPreset.gitOps?.hooks?.enabled).toBe(true);
      expect(smallTeamPreset.gitOps?.hooks?.non_blocking).toBe(true);
      expect(smallTeamPreset.gitOps?.hooks?.pre_commit?.validate_schema).toBe(
        true,
      );
      expect(
        smallTeamPreset.gitOps?.hooks?.pre_commit?.validate_state_machine,
      ).toBe(true);
    });

    it("has balanced validation", () => {
      expect(smallTeamPreset.gitOps?.validation?.enforce_schema).toBe(true);
      expect(smallTeamPreset.gitOps?.validation?.enforce_state_machine).toBe(
        true,
      );
      expect(smallTeamPreset.gitOps?.validation?.enforce_dependencies).toBe(
        false,
      );
      expect(smallTeamPreset.gitOps?.validation?.allow_wip_commits).toBe(true);
    });

    it("requires PR for main", () => {
      expect(smallTeamPreset.gitOps?.branches?.require_pr_for_main).toBe(true);
    });

    it("uses conventional commits", () => {
      expect(smallTeamPreset.gitOps?.commits?.format).toBe("conventional");
      expect(smallTeamPreset.gitOps?.commits?.add_coauthor).toBe(true);
    });

    it("passes schema validation", () => {
      expect(() => validateConfig(smallTeamPreset)).not.toThrow();
    });
  });

  describe("enterprisePreset", () => {
    it("has correct structure", () => {
      expect(enterprisePreset.version).toBe("1.0");
      expect(enterprisePreset.artifactsDir).toBe(".kodebase/artifacts");
      expect(enterprisePreset.gitOps).toBeDefined();
    });

    it("uses cascade_pr strategy without auto_merge", () => {
      expect(enterprisePreset.gitOps?.post_merge?.strategy).toBe("cascade_pr");
      expect(enterprisePreset.gitOps?.post_merge?.cascade_pr?.auto_merge).toBe(
        false,
      );
      expect(
        enterprisePreset.gitOps?.post_merge?.cascade_pr?.require_checks,
      ).toBe(true);
    });

    it("includes requires-review label", () => {
      expect(enterprisePreset.gitOps?.post_merge?.cascade_pr?.labels).toContain(
        "requires-review",
      );
    });

    it("enables draft PRs with team notifications", () => {
      expect(enterprisePreset.gitOps?.post_checkout?.create_draft_pr).toBe(
        true,
      );
      expect(enterprisePreset.gitOps?.post_checkout?.notify_team).toBe(true);
    });

    it("uses blocking hooks", () => {
      expect(enterprisePreset.gitOps?.hooks?.enabled).toBe(true);
      expect(enterprisePreset.gitOps?.hooks?.non_blocking).toBe(false);
      expect(enterprisePreset.gitOps?.hooks?.pre_commit?.non_blocking).toBe(
        false,
      );
      expect(enterprisePreset.gitOps?.hooks?.pre_push?.non_blocking).toBe(
        false,
      );
    });

    it("enforces all validations", () => {
      expect(enterprisePreset.gitOps?.validation?.enforce_schema).toBe(true);
      expect(enterprisePreset.gitOps?.validation?.enforce_state_machine).toBe(
        true,
      );
      expect(enterprisePreset.gitOps?.validation?.enforce_dependencies).toBe(
        true,
      );
      expect(enterprisePreset.gitOps?.validation?.error_on_warnings).toBe(true);
      expect(enterprisePreset.gitOps?.validation?.allow_wip_commits).toBe(
        false,
      );
    });

    it("uses batched cascade mode", () => {
      expect(enterprisePreset.gitOps?.cascades?.mode).toBe("batched");
      expect(enterprisePreset.gitOps?.cascades?.require_confirmation).toBe(
        true,
      );
      expect(enterprisePreset.gitOps?.cascades?.parallel_execution).toBe(false);
    });

    it("requires auto-request reviewers", () => {
      expect(enterprisePreset.gitOps?.pr_creation?.auto_request_reviewers).toBe(
        true,
      );
      expect(enterprisePreset.gitOps?.pr_creation?.add_to_project).toBe(true);
    });

    it("requires PR for main", () => {
      expect(enterprisePreset.gitOps?.branches?.require_pr_for_main).toBe(true);
    });

    it("passes schema validation", () => {
      expect(() => validateConfig(enterprisePreset)).not.toThrow();
    });
  });

  describe("defaultPreset", () => {
    it("has correct structure", () => {
      expect(defaultPreset.version).toBe("1.0");
      expect(defaultPreset.artifactsDir).toBe(".kodebase/artifacts");
      expect(defaultPreset.gitOps).toBeDefined();
    });

    it("uses cascade_pr strategy", () => {
      expect(defaultPreset.gitOps?.post_merge?.strategy).toBe("cascade_pr");
    });

    it("passes schema validation", () => {
      expect(() => validateConfig(defaultPreset)).not.toThrow();
    });
  });

  describe("presets object", () => {
    it("exports all presets", () => {
      expect(presets.solo).toBeDefined();
      expect(presets.small_team).toBeDefined();
      expect(presets.enterprise).toBeDefined();
      expect(presets.default).toBeDefined();
    });

    it("references correct preset objects", () => {
      expect(presets.solo).toBe(soloPreset);
      expect(presets.small_team).toBe(smallTeamPreset);
      expect(presets.enterprise).toBe(enterprisePreset);
      expect(presets.default).toBe(defaultPreset);
    });

    it("all presets pass validation", () => {
      Object.entries(presets).forEach(([name, preset]) => {
        expect(
          () => validateConfig(preset),
          `${name} preset should be valid`,
        ).not.toThrow();
      });
    });
  });

  describe("preset differences", () => {
    it("solo has fastest workflow (direct commits)", () => {
      expect(soloPreset.gitOps?.post_merge?.strategy).toBe("direct_commit");
      expect(smallTeamPreset.gitOps?.post_merge?.strategy).toBe("cascade_pr");
      expect(enterprisePreset.gitOps?.post_merge?.strategy).toBe("cascade_pr");
    });

    it("only enterprise disables auto_merge", () => {
      expect(smallTeamPreset.gitOps?.post_merge?.cascade_pr?.auto_merge).toBe(
        true,
      );
      expect(enterprisePreset.gitOps?.post_merge?.cascade_pr?.auto_merge).toBe(
        false,
      );
    });

    it("only enterprise uses blocking hooks", () => {
      expect(soloPreset.gitOps?.hooks?.non_blocking).toBe(true);
      expect(smallTeamPreset.gitOps?.hooks?.non_blocking).toBe(true);
      expect(enterprisePreset.gitOps?.hooks?.non_blocking).toBe(false);
    });

    it("validation strictness increases from solo to enterprise", () => {
      // Solo: minimal
      expect(soloPreset.gitOps?.validation?.enforce_state_machine).toBe(false);
      expect(soloPreset.gitOps?.validation?.enforce_dependencies).toBe(false);

      // Small team: balanced
      expect(smallTeamPreset.gitOps?.validation?.enforce_state_machine).toBe(
        true,
      );
      expect(smallTeamPreset.gitOps?.validation?.enforce_dependencies).toBe(
        false,
      );

      // Enterprise: strict
      expect(enterprisePreset.gitOps?.validation?.enforce_state_machine).toBe(
        true,
      );
      expect(enterprisePreset.gitOps?.validation?.enforce_dependencies).toBe(
        true,
      );
      expect(enterprisePreset.gitOps?.validation?.error_on_warnings).toBe(true);
    });

    it("only enterprise uses batched cascades", () => {
      expect(soloPreset.gitOps?.cascades?.mode).toBe("immediate");
      expect(smallTeamPreset.gitOps?.cascades?.mode).toBe("immediate");
      expect(enterprisePreset.gitOps?.cascades?.mode).toBe("batched");
    });

    it("solo allows WIP commits and skips PRs", () => {
      expect(soloPreset.gitOps?.validation?.allow_wip_commits).toBe(true);
      expect(soloPreset.gitOps?.branches?.require_pr_for_main).toBe(false);
      expect(enterprisePreset.gitOps?.validation?.allow_wip_commits).toBe(
        false,
      );
      expect(enterprisePreset.gitOps?.branches?.require_pr_for_main).toBe(true);
    });
  });
});

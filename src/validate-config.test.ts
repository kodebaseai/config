/**
 * Tests for configuration validation.
 */

import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import {
  cascadeModeSchema,
  commitFormatSchema,
  platformTypeSchema,
  postMergeStrategySchema,
  validateConfig,
} from "./validate-config.js";

describe("validateConfig", () => {
  describe("valid configurations", () => {
    it("validates minimal config with defaults", () => {
      const config = validateConfig({});

      expect(config.version).toBe("1.0");
      expect(config.artifactsDir).toBe(".kodebase/artifacts");
    });

    it("validates full config with all sections", () => {
      const config = validateConfig({
        version: "1.0",
        artifactsDir: "custom/path",
        gitOps: {
          post_merge: {
            strategy: "cascade_pr",
            cascade_pr: {
              auto_merge: true,
              require_checks: true,
              labels: ["cascade"],
            },
          },
          post_checkout: {
            create_draft_pr: true,
            pr_template: "default",
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
      });

      expect(config.gitOps?.post_merge?.strategy).toBe("cascade_pr");
      expect(config.gitOps?.platform?.type).toBe("github");
    });

    it("applies defaults for missing optional fields", () => {
      const config = validateConfig({
        gitOps: {
          post_merge: {},
        },
      });

      expect(config.gitOps?.post_merge?.strategy).toBe("cascade_pr");
    });
  });

  describe("enum validations", () => {
    it("validates post_merge strategies", () => {
      expect(() => postMergeStrategySchema.parse("cascade_pr")).not.toThrow();
      expect(() =>
        postMergeStrategySchema.parse("direct_commit"),
      ).not.toThrow();
      expect(() => postMergeStrategySchema.parse("manual")).not.toThrow();

      expect(() => postMergeStrategySchema.parse("invalid")).toThrow(ZodError);
    });

    it("validates platform types", () => {
      expect(() => platformTypeSchema.parse("github")).not.toThrow();
      expect(() => platformTypeSchema.parse("gitlab")).not.toThrow();
      expect(() => platformTypeSchema.parse("bitbucket")).not.toThrow();

      expect(() => platformTypeSchema.parse("invalid")).toThrow(ZodError);
    });

    it("validates cascade modes", () => {
      expect(() => cascadeModeSchema.parse("immediate")).not.toThrow();
      expect(() => cascadeModeSchema.parse("batched")).not.toThrow();
      expect(() => cascadeModeSchema.parse("manual")).not.toThrow();

      expect(() => cascadeModeSchema.parse("invalid")).toThrow(ZodError);
    });

    it("validates commit formats", () => {
      expect(() => commitFormatSchema.parse("conventional")).not.toThrow();
      expect(() => commitFormatSchema.parse("simple")).not.toThrow();
      expect(() => commitFormatSchema.parse("custom")).not.toThrow();

      expect(() => commitFormatSchema.parse("invalid")).toThrow(ZodError);
    });
  });

  describe("post_merge configuration", () => {
    it("validates cascade_pr strategy", () => {
      const config = validateConfig({
        gitOps: {
          post_merge: {
            strategy: "cascade_pr",
            cascade_pr: {
              auto_merge: false,
              require_checks: true,
              labels: ["automated", "cascade"],
              branch_prefix: "auto/",
              delete_branch: true,
            },
          },
        },
      });

      expect(config.gitOps?.post_merge?.cascade_pr?.auto_merge).toBe(false);
      expect(config.gitOps?.post_merge?.cascade_pr?.labels).toEqual([
        "automated",
        "cascade",
      ]);
    });

    it("validates direct_commit strategy", () => {
      const config = validateConfig({
        gitOps: {
          post_merge: {
            strategy: "direct_commit",
            direct_commit: {
              commit_prefix: "auto: ",
              push_immediately: false,
            },
          },
        },
      });

      expect(config.gitOps?.post_merge?.direct_commit?.push_immediately).toBe(
        false,
      );
    });
  });

  describe("hooks configuration", () => {
    it("validates hooks with master switches", () => {
      const config = validateConfig({
        gitOps: {
          hooks: {
            enabled: true,
            non_blocking: false,
            log_errors: true,
            log_level: "debug",
          },
        },
      });

      expect(config.gitOps?.hooks?.enabled).toBe(true);
      expect(config.gitOps?.hooks?.non_blocking).toBe(false);
      expect(config.gitOps?.hooks?.log_level).toBe("debug");
    });

    it("validates pre_commit hook configuration", () => {
      const config = validateConfig({
        gitOps: {
          hooks: {
            pre_commit: {
              enabled: true,
              validate_schema: true,
              validate_state_machine: false,
              validate_dependencies: true,
            },
          },
        },
      });

      expect(config.gitOps?.hooks?.pre_commit?.validate_schema).toBe(true);
      expect(config.gitOps?.hooks?.pre_commit?.validate_state_machine).toBe(
        false,
      );
    });

    it("validates pre_push hook configuration", () => {
      const config = validateConfig({
        gitOps: {
          hooks: {
            pre_push: {
              enabled: true,
              warn_wip_artifacts: false,
              warn_non_artifact_branches: true,
            },
          },
        },
      });

      expect(config.gitOps?.hooks?.pre_push?.warn_wip_artifacts).toBe(false);
    });
  });

  describe("platform configuration", () => {
    it("validates GitHub platform", () => {
      const config = validateConfig({
        gitOps: {
          platform: {
            type: "github",
            github: {
              api_url: "https://api.github.com",
              token_env_var: "GH_TOKEN",
            },
          },
        },
      });

      expect(config.gitOps?.platform?.github?.token_env_var).toBe("GH_TOKEN");
    });

    it("validates GitLab platform", () => {
      const config = validateConfig({
        gitOps: {
          platform: {
            type: "gitlab",
            gitlab: {
              api_url: "https://gitlab.example.com/api/v4",
            },
          },
        },
      });

      expect(config.gitOps?.platform?.type).toBe("gitlab");
    });

    it("rejects invalid URL formats", () => {
      expect(() =>
        validateConfig({
          gitOps: {
            platform: {
              github: {
                api_url: "not-a-url",
              },
            },
          },
        }),
      ).toThrow(ZodError);
    });
  });

  describe("cascades configuration", () => {
    it("validates cascade execution settings", () => {
      const config = validateConfig({
        gitOps: {
          cascades: {
            mode: "batched",
            batch_delay_seconds: 60,
            max_batch_size: 20,
            parallel_execution: true,
            max_parallelism: 10,
          },
        },
      });

      expect(config.gitOps?.cascades?.batch_delay_seconds).toBe(60);
      expect(config.gitOps?.cascades?.max_parallelism).toBe(10);
    });

    it("rejects invalid number ranges", () => {
      expect(() =>
        validateConfig({
          gitOps: {
            cascades: {
              batch_delay_seconds: -1,
            },
          },
        }),
      ).toThrow(ZodError);

      expect(() =>
        validateConfig({
          gitOps: {
            cascades: {
              max_parallelism: 0,
            },
          },
        }),
      ).toThrow(ZodError);
    });
  });

  describe("validation configuration", () => {
    it("validates enforcement flags", () => {
      const config = validateConfig({
        gitOps: {
          validation: {
            enforce_schema: true,
            enforce_state_machine: false,
            enforce_dependencies: true,
            error_on_warnings: true,
          },
        },
      });

      expect(config.gitOps?.validation?.enforce_schema).toBe(true);
      expect(config.gitOps?.validation?.error_on_warnings).toBe(true);
    });
  });

  describe("branches configuration", () => {
    it("validates branch management settings", () => {
      const config = validateConfig({
        gitOps: {
          branches: {
            artifact_branch_format: "{artifact_type}/{artifact_id}",
            cascade_branch_format: "cascade/{parent_id}",
            delete_after_merge: false,
            allowed_direct_branches: ["main", "develop"],
          },
        },
      });

      expect(config.gitOps?.branches?.delete_after_merge).toBe(false);
      expect(config.gitOps?.branches?.allowed_direct_branches).toEqual([
        "main",
        "develop",
      ]);
    });
  });

  describe("commits configuration", () => {
    it("validates conventional commits format", () => {
      const config = validateConfig({
        gitOps: {
          commits: {
            format: "conventional",
            conventional: {
              type_prefix: "feat",
              scope: "config",
              breaking_change_marker: "!",
            },
          },
        },
      });

      expect(config.gitOps?.commits?.format).toBe("conventional");
      expect(config.gitOps?.commits?.conventional?.type_prefix).toBe("feat");
    });

    it("validates custom commit format", () => {
      const config = validateConfig({
        gitOps: {
          commits: {
            format: "custom",
            custom_template: "[{type}] {message}",
          },
        },
      });

      expect(config.gitOps?.commits?.format).toBe("custom");
    });
  });

  describe("PR creation configuration", () => {
    it("validates PR templates and automation", () => {
      const config = validateConfig({
        gitOps: {
          pr_creation: {
            title_template: "[{artifact_type}] {title}",
            auto_assign: true,
            additional_labels: ["automated"],
            default_reviewers: ["user1", "user2"],
          },
        },
      });

      expect(config.gitOps?.pr_creation?.auto_assign).toBe(true);
      expect(config.gitOps?.pr_creation?.default_reviewers).toEqual([
        "user1",
        "user2",
      ]);
    });
  });

  describe("error messages", () => {
    it("provides clear error for invalid enum", () => {
      try {
        validateConfig({
          gitOps: {
            post_merge: {
              strategy: "invalid_strategy",
            },
          },
        });
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        const zodError = error as ZodError;
        expect(zodError.errors[0].message).toContain("Invalid enum value");
      }
    });

    it("provides clear error for type mismatch", () => {
      try {
        validateConfig({
          gitOps: {
            hooks: {
              enabled: "not a boolean",
            },
          },
        });
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
      }
    });
  });
});

/**
 * Small team preset - balanced workflow for collaborative teams.
 *
 * Best for:
 * - Small teams (2-10 developers)
 * - Collaborative development with code review
 * - Projects requiring some quality gates
 *
 * Key features:
 * - Cascade PRs with auto-merge when checks pass
 * - Draft PRs for visibility and early feedback
 * - Balanced validation (schema + state machine)
 * - Automated labels and assignments
 */
export const smallTeamPreset = {
    version: "1.0",
    artifactsDir: ".kodebase/artifacts",
    gitOps: {
        post_merge: {
            strategy: "cascade_pr",
            cascade_pr: {
                auto_merge: true,
                require_checks: true,
                labels: ["cascade", "automated"],
                branch_prefix: "cascade/",
                delete_branch: true,
            },
        },
        post_checkout: {
            create_draft_pr: true,
            pr_template: "default",
            auto_assign: true,
            auto_add_labels: true,
            notify_team: false,
        },
        hooks: {
            enabled: true,
            non_blocking: true,
            log_errors: true,
            log_level: "info",
            pre_commit: {
                enabled: true,
                validate_schema: true,
                validate_state_machine: true,
                validate_dependencies: false,
            },
            pre_push: {
                enabled: true,
                warn_wip_artifacts: true,
                warn_non_artifact_branches: false,
            },
        },
        platform: {
            type: "github",
            auth_strategy: "auto",
        },
        pr_creation: {
            auto_assign: true,
            auto_add_labels: true,
            auto_request_reviewers: false,
            link_milestone: true,
            add_to_project: false,
        },
        cascades: {
            mode: "immediate",
            parallel_execution: true,
            max_parallelism: 3,
            dry_run: false,
            require_confirmation: false,
        },
        validation: {
            enforce_schema: true,
            enforce_state_machine: true,
            enforce_dependencies: false,
            warn_missing_fields: true,
            error_on_warnings: false,
            allow_wip_commits: true,
            allow_cross_milestone_deps: false,
        },
        branches: {
            delete_after_merge: true,
            delete_cascade_branches: true,
            require_pr_for_main: true,
        },
        commits: {
            format: "conventional",
            conventional: {
                type_prefix: "feat",
                breaking_change_marker: "!",
            },
            add_coauthor: true,
        },
    },
};
//# sourceMappingURL=small-team.js.map
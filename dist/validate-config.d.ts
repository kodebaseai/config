/**
 * Configuration validation functions using Zod.
 */
import { z } from "zod";
import type { KodebaseConfig } from "./types.js";
/**
 * Post-merge strategy schema.
 */
export declare const postMergeStrategySchema: z.ZodEnum<["cascade_pr", "direct_commit", "manual"]>;
/**
 * Platform type schema.
 */
export declare const platformTypeSchema: z.ZodEnum<["github", "gitlab", "bitbucket"]>;
/**
 * Authentication strategy schema.
 */
export declare const authStrategySchema: z.ZodEnum<["auto", "token", "cli"]>;
/**
 * Cascade mode schema.
 */
export declare const cascadeModeSchema: z.ZodEnum<["immediate", "batched", "manual"]>;
/**
 * Commit format schema.
 */
export declare const commitFormatSchema: z.ZodEnum<["conventional", "simple", "custom"]>;
/**
 * Log level schema.
 */
export declare const logLevelSchema: z.ZodEnum<["debug", "info", "warn", "error"]>;
/**
 * Cascade PR configuration schema.
 */
export declare const cascadePRConfigSchema: z.ZodObject<{
    auto_merge: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    require_checks: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    labels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    branch_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    delete_branch: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    auto_merge: boolean;
    require_checks: boolean;
    labels: string[];
    branch_prefix: string;
    delete_branch: boolean;
}, {
    auto_merge?: boolean | undefined;
    require_checks?: boolean | undefined;
    labels?: string[] | undefined;
    branch_prefix?: string | undefined;
    delete_branch?: boolean | undefined;
}>;
/**
 * Direct commit configuration schema.
 */
export declare const directCommitConfigSchema: z.ZodObject<{
    commit_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    push_immediately: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    commit_prefix: string;
    push_immediately: boolean;
}, {
    commit_prefix?: string | undefined;
    push_immediately?: boolean | undefined;
}>;
/**
 * Post-merge configuration schema.
 */
export declare const postMergeConfigSchema: z.ZodObject<{
    strategy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["cascade_pr", "direct_commit", "manual"]>>>;
    cascade_pr: z.ZodOptional<z.ZodObject<{
        auto_merge: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        require_checks: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        labels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        branch_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        delete_branch: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        auto_merge: boolean;
        require_checks: boolean;
        labels: string[];
        branch_prefix: string;
        delete_branch: boolean;
    }, {
        auto_merge?: boolean | undefined;
        require_checks?: boolean | undefined;
        labels?: string[] | undefined;
        branch_prefix?: string | undefined;
        delete_branch?: boolean | undefined;
    }>>;
    direct_commit: z.ZodOptional<z.ZodObject<{
        commit_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        push_immediately: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        commit_prefix: string;
        push_immediately: boolean;
    }, {
        commit_prefix?: string | undefined;
        push_immediately?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    strategy: "cascade_pr" | "direct_commit" | "manual";
    cascade_pr?: {
        auto_merge: boolean;
        require_checks: boolean;
        labels: string[];
        branch_prefix: string;
        delete_branch: boolean;
    } | undefined;
    direct_commit?: {
        commit_prefix: string;
        push_immediately: boolean;
    } | undefined;
}, {
    cascade_pr?: {
        auto_merge?: boolean | undefined;
        require_checks?: boolean | undefined;
        labels?: string[] | undefined;
        branch_prefix?: string | undefined;
        delete_branch?: boolean | undefined;
    } | undefined;
    direct_commit?: {
        commit_prefix?: string | undefined;
        push_immediately?: boolean | undefined;
    } | undefined;
    strategy?: "cascade_pr" | "direct_commit" | "manual" | undefined;
}>;
/**
 * Post-checkout configuration schema.
 */
export declare const postCheckoutConfigSchema: z.ZodObject<{
    create_draft_pr: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    pr_template: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    auto_assign: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    auto_add_labels: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    notify_team: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    create_draft_pr: boolean;
    pr_template: string;
    auto_assign: boolean;
    auto_add_labels: boolean;
    notify_team: boolean;
}, {
    create_draft_pr?: boolean | undefined;
    pr_template?: string | undefined;
    auto_assign?: boolean | undefined;
    auto_add_labels?: boolean | undefined;
    notify_team?: boolean | undefined;
}>;
/**
 * Individual hook configuration schema.
 */
export declare const hookConfigSchema: z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
    non_blocking: z.ZodOptional<z.ZodBoolean>;
    script: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    enabled?: boolean | undefined;
    non_blocking?: boolean | undefined;
    script?: string | undefined;
}, {
    enabled?: boolean | undefined;
    non_blocking?: boolean | undefined;
    script?: string | undefined;
}>;
/**
 * Pre-commit hook configuration schema.
 */
export declare const preCommitConfigSchema: z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
    non_blocking: z.ZodOptional<z.ZodBoolean>;
    script: z.ZodOptional<z.ZodString>;
} & {
    validate_schema: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    validate_state_machine: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    validate_dependencies: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    validate_schema: boolean;
    validate_state_machine: boolean;
    validate_dependencies: boolean;
    enabled?: boolean | undefined;
    non_blocking?: boolean | undefined;
    script?: string | undefined;
}, {
    validate_schema?: boolean | undefined;
    validate_state_machine?: boolean | undefined;
    validate_dependencies?: boolean | undefined;
    enabled?: boolean | undefined;
    non_blocking?: boolean | undefined;
    script?: string | undefined;
}>;
/**
 * Pre-push hook configuration schema.
 */
export declare const prePushConfigSchema: z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
    non_blocking: z.ZodOptional<z.ZodBoolean>;
    script: z.ZodOptional<z.ZodString>;
} & {
    warn_wip_artifacts: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    warn_non_artifact_branches: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    warn_wip_artifacts: boolean;
    warn_non_artifact_branches: boolean;
    enabled?: boolean | undefined;
    non_blocking?: boolean | undefined;
    script?: string | undefined;
}, {
    warn_wip_artifacts?: boolean | undefined;
    warn_non_artifact_branches?: boolean | undefined;
    enabled?: boolean | undefined;
    non_blocking?: boolean | undefined;
    script?: string | undefined;
}>;
/**
 * Git hooks configuration schema.
 */
export declare const hooksConfigSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    non_blocking: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    log_errors: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    log_level: z.ZodDefault<z.ZodOptional<z.ZodEnum<["debug", "info", "warn", "error"]>>>;
    post_checkout: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        non_blocking: z.ZodOptional<z.ZodBoolean>;
        script: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    }, {
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    }>>;
    post_merge: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        non_blocking: z.ZodOptional<z.ZodBoolean>;
        script: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    }, {
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    }>>;
    pre_commit: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        non_blocking: z.ZodOptional<z.ZodBoolean>;
        script: z.ZodOptional<z.ZodString>;
    } & {
        validate_schema: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        validate_state_machine: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        validate_dependencies: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        validate_schema: boolean;
        validate_state_machine: boolean;
        validate_dependencies: boolean;
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    }, {
        validate_schema?: boolean | undefined;
        validate_state_machine?: boolean | undefined;
        validate_dependencies?: boolean | undefined;
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    }>>;
    pre_push: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        non_blocking: z.ZodOptional<z.ZodBoolean>;
        script: z.ZodOptional<z.ZodString>;
    } & {
        warn_wip_artifacts: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        warn_non_artifact_branches: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        warn_wip_artifacts: boolean;
        warn_non_artifact_branches: boolean;
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    }, {
        warn_wip_artifacts?: boolean | undefined;
        warn_non_artifact_branches?: boolean | undefined;
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    non_blocking: boolean;
    log_errors: boolean;
    log_level: "debug" | "info" | "warn" | "error";
    post_checkout?: {
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    } | undefined;
    post_merge?: {
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    } | undefined;
    pre_commit?: {
        validate_schema: boolean;
        validate_state_machine: boolean;
        validate_dependencies: boolean;
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    } | undefined;
    pre_push?: {
        warn_wip_artifacts: boolean;
        warn_non_artifact_branches: boolean;
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    } | undefined;
}, {
    enabled?: boolean | undefined;
    non_blocking?: boolean | undefined;
    log_errors?: boolean | undefined;
    log_level?: "debug" | "info" | "warn" | "error" | undefined;
    post_checkout?: {
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    } | undefined;
    post_merge?: {
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    } | undefined;
    pre_commit?: {
        validate_schema?: boolean | undefined;
        validate_state_machine?: boolean | undefined;
        validate_dependencies?: boolean | undefined;
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    } | undefined;
    pre_push?: {
        warn_wip_artifacts?: boolean | undefined;
        warn_non_artifact_branches?: boolean | undefined;
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        script?: string | undefined;
    } | undefined;
}>;
/**
 * GitHub configuration schema.
 */
export declare const gitHubConfigSchema: z.ZodObject<{
    api_url: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    token_env_var: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    api_url: string;
    token_env_var: string;
}, {
    api_url?: string | undefined;
    token_env_var?: string | undefined;
}>;
/**
 * GitLab configuration schema.
 */
export declare const gitLabConfigSchema: z.ZodObject<{
    api_url: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    token_env_var: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    api_url: string;
    token_env_var: string;
}, {
    api_url?: string | undefined;
    token_env_var?: string | undefined;
}>;
/**
 * Bitbucket configuration schema.
 */
export declare const bitbucketConfigSchema: z.ZodObject<{
    api_url: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    token_env_var: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    api_url: string;
    token_env_var: string;
}, {
    api_url?: string | undefined;
    token_env_var?: string | undefined;
}>;
/**
 * Platform configuration schema.
 */
export declare const platformConfigSchema: z.ZodObject<{
    type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["github", "gitlab", "bitbucket"]>>>;
    auth_strategy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["auto", "token", "cli"]>>>;
    github: z.ZodOptional<z.ZodObject<{
        api_url: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        token_env_var: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        api_url: string;
        token_env_var: string;
    }, {
        api_url?: string | undefined;
        token_env_var?: string | undefined;
    }>>;
    gitlab: z.ZodOptional<z.ZodObject<{
        api_url: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        token_env_var: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        api_url: string;
        token_env_var: string;
    }, {
        api_url?: string | undefined;
        token_env_var?: string | undefined;
    }>>;
    bitbucket: z.ZodOptional<z.ZodObject<{
        api_url: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        token_env_var: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        api_url: string;
        token_env_var: string;
    }, {
        api_url?: string | undefined;
        token_env_var?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "github" | "gitlab" | "bitbucket";
    auth_strategy: "auto" | "token" | "cli";
    github?: {
        api_url: string;
        token_env_var: string;
    } | undefined;
    gitlab?: {
        api_url: string;
        token_env_var: string;
    } | undefined;
    bitbucket?: {
        api_url: string;
        token_env_var: string;
    } | undefined;
}, {
    github?: {
        api_url?: string | undefined;
        token_env_var?: string | undefined;
    } | undefined;
    gitlab?: {
        api_url?: string | undefined;
        token_env_var?: string | undefined;
    } | undefined;
    bitbucket?: {
        api_url?: string | undefined;
        token_env_var?: string | undefined;
    } | undefined;
    type?: "github" | "gitlab" | "bitbucket" | undefined;
    auth_strategy?: "auto" | "token" | "cli" | undefined;
}>;
/**
 * PR creation configuration schema.
 */
export declare const prCreationConfigSchema: z.ZodObject<{
    title_template: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    body_template: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    auto_assign: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    auto_add_labels: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    auto_request_reviewers: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    additional_labels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    default_reviewers: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    link_milestone: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    add_to_project: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    project_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    auto_assign: boolean;
    auto_add_labels: boolean;
    title_template: string;
    body_template: string;
    auto_request_reviewers: boolean;
    additional_labels: string[];
    default_reviewers: string[];
    link_milestone: boolean;
    add_to_project: boolean;
    project_id?: string | undefined;
}, {
    auto_assign?: boolean | undefined;
    auto_add_labels?: boolean | undefined;
    title_template?: string | undefined;
    body_template?: string | undefined;
    auto_request_reviewers?: boolean | undefined;
    additional_labels?: string[] | undefined;
    default_reviewers?: string[] | undefined;
    link_milestone?: boolean | undefined;
    add_to_project?: boolean | undefined;
    project_id?: string | undefined;
}>;
/**
 * Cascade execution configuration schema.
 */
export declare const cascadesConfigSchema: z.ZodObject<{
    mode: z.ZodDefault<z.ZodOptional<z.ZodEnum<["immediate", "batched", "manual"]>>>;
    batch_delay_seconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    max_batch_size: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    parallel_execution: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    max_parallelism: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    dry_run: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    require_confirmation: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    mode: "manual" | "immediate" | "batched";
    batch_delay_seconds: number;
    max_batch_size: number;
    parallel_execution: boolean;
    max_parallelism: number;
    dry_run: boolean;
    require_confirmation: boolean;
}, {
    mode?: "manual" | "immediate" | "batched" | undefined;
    batch_delay_seconds?: number | undefined;
    max_batch_size?: number | undefined;
    parallel_execution?: boolean | undefined;
    max_parallelism?: number | undefined;
    dry_run?: boolean | undefined;
    require_confirmation?: boolean | undefined;
}>;
/**
 * Validation configuration schema.
 */
export declare const validationConfigSchema: z.ZodObject<{
    enforce_schema: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    enforce_state_machine: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    enforce_dependencies: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    warn_missing_fields: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    error_on_warnings: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    allow_wip_commits: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    allow_cross_milestone_deps: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    warn_draft_artifacts: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    warn_blocked_artifacts: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    enforce_schema: boolean;
    enforce_state_machine: boolean;
    enforce_dependencies: boolean;
    warn_missing_fields: boolean;
    error_on_warnings: boolean;
    allow_wip_commits: boolean;
    allow_cross_milestone_deps: boolean;
    warn_draft_artifacts: boolean;
    warn_blocked_artifacts: boolean;
}, {
    enforce_schema?: boolean | undefined;
    enforce_state_machine?: boolean | undefined;
    enforce_dependencies?: boolean | undefined;
    warn_missing_fields?: boolean | undefined;
    error_on_warnings?: boolean | undefined;
    allow_wip_commits?: boolean | undefined;
    allow_cross_milestone_deps?: boolean | undefined;
    warn_draft_artifacts?: boolean | undefined;
    warn_blocked_artifacts?: boolean | undefined;
}>;
/**
 * Branch management configuration schema.
 */
export declare const branchesConfigSchema: z.ZodObject<{
    artifact_branch_format: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    cascade_branch_format: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    delete_after_merge: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    delete_cascade_branches: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    require_pr_for_main: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    allowed_direct_branches: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    artifact_branch_format: string;
    cascade_branch_format: string;
    delete_after_merge: boolean;
    delete_cascade_branches: boolean;
    require_pr_for_main: boolean;
    allowed_direct_branches: string[];
}, {
    artifact_branch_format?: string | undefined;
    cascade_branch_format?: string | undefined;
    delete_after_merge?: boolean | undefined;
    delete_cascade_branches?: boolean | undefined;
    require_pr_for_main?: boolean | undefined;
    allowed_direct_branches?: string[] | undefined;
}>;
/**
 * Conventional commits configuration schema.
 */
export declare const conventionalCommitsConfigSchema: z.ZodObject<{
    type_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    scope: z.ZodOptional<z.ZodString>;
    breaking_change_marker: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type_prefix: string;
    breaking_change_marker: string;
    scope?: string | undefined;
}, {
    type_prefix?: string | undefined;
    scope?: string | undefined;
    breaking_change_marker?: string | undefined;
}>;
/**
 * Commit message formatting configuration schema.
 */
export declare const commitsConfigSchema: z.ZodObject<{
    format: z.ZodDefault<z.ZodOptional<z.ZodEnum<["conventional", "simple", "custom"]>>>;
    conventional: z.ZodOptional<z.ZodObject<{
        type_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        scope: z.ZodOptional<z.ZodString>;
        breaking_change_marker: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        type_prefix: string;
        breaking_change_marker: string;
        scope?: string | undefined;
    }, {
        type_prefix?: string | undefined;
        scope?: string | undefined;
        breaking_change_marker?: string | undefined;
    }>>;
    custom_template: z.ZodOptional<z.ZodString>;
    cascade_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    validation_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    add_coauthor: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    agent_email_format: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    format: "conventional" | "simple" | "custom";
    cascade_prefix: string;
    validation_prefix: string;
    add_coauthor: boolean;
    agent_email_format: string;
    conventional?: {
        type_prefix: string;
        breaking_change_marker: string;
        scope?: string | undefined;
    } | undefined;
    custom_template?: string | undefined;
}, {
    conventional?: {
        type_prefix?: string | undefined;
        scope?: string | undefined;
        breaking_change_marker?: string | undefined;
    } | undefined;
    format?: "conventional" | "simple" | "custom" | undefined;
    custom_template?: string | undefined;
    cascade_prefix?: string | undefined;
    validation_prefix?: string | undefined;
    add_coauthor?: boolean | undefined;
    agent_email_format?: string | undefined;
}>;
/**
 * Git operations configuration schema.
 */
export declare const gitOpsConfigSchema: z.ZodObject<{
    post_merge: z.ZodOptional<z.ZodObject<{
        strategy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["cascade_pr", "direct_commit", "manual"]>>>;
        cascade_pr: z.ZodOptional<z.ZodObject<{
            auto_merge: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            require_checks: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            labels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            branch_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            delete_branch: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            auto_merge: boolean;
            require_checks: boolean;
            labels: string[];
            branch_prefix: string;
            delete_branch: boolean;
        }, {
            auto_merge?: boolean | undefined;
            require_checks?: boolean | undefined;
            labels?: string[] | undefined;
            branch_prefix?: string | undefined;
            delete_branch?: boolean | undefined;
        }>>;
        direct_commit: z.ZodOptional<z.ZodObject<{
            commit_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            push_immediately: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            commit_prefix: string;
            push_immediately: boolean;
        }, {
            commit_prefix?: string | undefined;
            push_immediately?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        strategy: "cascade_pr" | "direct_commit" | "manual";
        cascade_pr?: {
            auto_merge: boolean;
            require_checks: boolean;
            labels: string[];
            branch_prefix: string;
            delete_branch: boolean;
        } | undefined;
        direct_commit?: {
            commit_prefix: string;
            push_immediately: boolean;
        } | undefined;
    }, {
        cascade_pr?: {
            auto_merge?: boolean | undefined;
            require_checks?: boolean | undefined;
            labels?: string[] | undefined;
            branch_prefix?: string | undefined;
            delete_branch?: boolean | undefined;
        } | undefined;
        direct_commit?: {
            commit_prefix?: string | undefined;
            push_immediately?: boolean | undefined;
        } | undefined;
        strategy?: "cascade_pr" | "direct_commit" | "manual" | undefined;
    }>>;
    post_checkout: z.ZodOptional<z.ZodObject<{
        create_draft_pr: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        pr_template: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        auto_assign: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        auto_add_labels: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        notify_team: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        create_draft_pr: boolean;
        pr_template: string;
        auto_assign: boolean;
        auto_add_labels: boolean;
        notify_team: boolean;
    }, {
        create_draft_pr?: boolean | undefined;
        pr_template?: string | undefined;
        auto_assign?: boolean | undefined;
        auto_add_labels?: boolean | undefined;
        notify_team?: boolean | undefined;
    }>>;
    hooks: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        non_blocking: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        log_errors: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        log_level: z.ZodDefault<z.ZodOptional<z.ZodEnum<["debug", "info", "warn", "error"]>>>;
        post_checkout: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodOptional<z.ZodBoolean>;
            non_blocking: z.ZodOptional<z.ZodBoolean>;
            script: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        }, {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        }>>;
        post_merge: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodOptional<z.ZodBoolean>;
            non_blocking: z.ZodOptional<z.ZodBoolean>;
            script: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        }, {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        }>>;
        pre_commit: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodOptional<z.ZodBoolean>;
            non_blocking: z.ZodOptional<z.ZodBoolean>;
            script: z.ZodOptional<z.ZodString>;
        } & {
            validate_schema: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            validate_state_machine: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            validate_dependencies: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            validate_schema: boolean;
            validate_state_machine: boolean;
            validate_dependencies: boolean;
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        }, {
            validate_schema?: boolean | undefined;
            validate_state_machine?: boolean | undefined;
            validate_dependencies?: boolean | undefined;
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        }>>;
        pre_push: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodOptional<z.ZodBoolean>;
            non_blocking: z.ZodOptional<z.ZodBoolean>;
            script: z.ZodOptional<z.ZodString>;
        } & {
            warn_wip_artifacts: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            warn_non_artifact_branches: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            warn_wip_artifacts: boolean;
            warn_non_artifact_branches: boolean;
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        }, {
            warn_wip_artifacts?: boolean | undefined;
            warn_non_artifact_branches?: boolean | undefined;
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        non_blocking: boolean;
        log_errors: boolean;
        log_level: "debug" | "info" | "warn" | "error";
        post_checkout?: {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
        post_merge?: {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
        pre_commit?: {
            validate_schema: boolean;
            validate_state_machine: boolean;
            validate_dependencies: boolean;
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
        pre_push?: {
            warn_wip_artifacts: boolean;
            warn_non_artifact_branches: boolean;
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
    }, {
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        log_errors?: boolean | undefined;
        log_level?: "debug" | "info" | "warn" | "error" | undefined;
        post_checkout?: {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
        post_merge?: {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
        pre_commit?: {
            validate_schema?: boolean | undefined;
            validate_state_machine?: boolean | undefined;
            validate_dependencies?: boolean | undefined;
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
        pre_push?: {
            warn_wip_artifacts?: boolean | undefined;
            warn_non_artifact_branches?: boolean | undefined;
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
    }>>;
    platform: z.ZodOptional<z.ZodObject<{
        type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["github", "gitlab", "bitbucket"]>>>;
        auth_strategy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["auto", "token", "cli"]>>>;
        github: z.ZodOptional<z.ZodObject<{
            api_url: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            token_env_var: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            api_url: string;
            token_env_var: string;
        }, {
            api_url?: string | undefined;
            token_env_var?: string | undefined;
        }>>;
        gitlab: z.ZodOptional<z.ZodObject<{
            api_url: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            token_env_var: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            api_url: string;
            token_env_var: string;
        }, {
            api_url?: string | undefined;
            token_env_var?: string | undefined;
        }>>;
        bitbucket: z.ZodOptional<z.ZodObject<{
            api_url: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            token_env_var: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            api_url: string;
            token_env_var: string;
        }, {
            api_url?: string | undefined;
            token_env_var?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "github" | "gitlab" | "bitbucket";
        auth_strategy: "auto" | "token" | "cli";
        github?: {
            api_url: string;
            token_env_var: string;
        } | undefined;
        gitlab?: {
            api_url: string;
            token_env_var: string;
        } | undefined;
        bitbucket?: {
            api_url: string;
            token_env_var: string;
        } | undefined;
    }, {
        github?: {
            api_url?: string | undefined;
            token_env_var?: string | undefined;
        } | undefined;
        gitlab?: {
            api_url?: string | undefined;
            token_env_var?: string | undefined;
        } | undefined;
        bitbucket?: {
            api_url?: string | undefined;
            token_env_var?: string | undefined;
        } | undefined;
        type?: "github" | "gitlab" | "bitbucket" | undefined;
        auth_strategy?: "auto" | "token" | "cli" | undefined;
    }>>;
    pr_creation: z.ZodOptional<z.ZodObject<{
        title_template: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        body_template: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        auto_assign: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        auto_add_labels: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        auto_request_reviewers: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        additional_labels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        default_reviewers: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        link_milestone: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        add_to_project: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        project_id: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        auto_assign: boolean;
        auto_add_labels: boolean;
        title_template: string;
        body_template: string;
        auto_request_reviewers: boolean;
        additional_labels: string[];
        default_reviewers: string[];
        link_milestone: boolean;
        add_to_project: boolean;
        project_id?: string | undefined;
    }, {
        auto_assign?: boolean | undefined;
        auto_add_labels?: boolean | undefined;
        title_template?: string | undefined;
        body_template?: string | undefined;
        auto_request_reviewers?: boolean | undefined;
        additional_labels?: string[] | undefined;
        default_reviewers?: string[] | undefined;
        link_milestone?: boolean | undefined;
        add_to_project?: boolean | undefined;
        project_id?: string | undefined;
    }>>;
    cascades: z.ZodOptional<z.ZodObject<{
        mode: z.ZodDefault<z.ZodOptional<z.ZodEnum<["immediate", "batched", "manual"]>>>;
        batch_delay_seconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        max_batch_size: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        parallel_execution: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        max_parallelism: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        dry_run: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        require_confirmation: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        mode: "manual" | "immediate" | "batched";
        batch_delay_seconds: number;
        max_batch_size: number;
        parallel_execution: boolean;
        max_parallelism: number;
        dry_run: boolean;
        require_confirmation: boolean;
    }, {
        mode?: "manual" | "immediate" | "batched" | undefined;
        batch_delay_seconds?: number | undefined;
        max_batch_size?: number | undefined;
        parallel_execution?: boolean | undefined;
        max_parallelism?: number | undefined;
        dry_run?: boolean | undefined;
        require_confirmation?: boolean | undefined;
    }>>;
    validation: z.ZodOptional<z.ZodObject<{
        enforce_schema: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        enforce_state_machine: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        enforce_dependencies: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        warn_missing_fields: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        error_on_warnings: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        allow_wip_commits: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        allow_cross_milestone_deps: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        warn_draft_artifacts: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        warn_blocked_artifacts: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        enforce_schema: boolean;
        enforce_state_machine: boolean;
        enforce_dependencies: boolean;
        warn_missing_fields: boolean;
        error_on_warnings: boolean;
        allow_wip_commits: boolean;
        allow_cross_milestone_deps: boolean;
        warn_draft_artifacts: boolean;
        warn_blocked_artifacts: boolean;
    }, {
        enforce_schema?: boolean | undefined;
        enforce_state_machine?: boolean | undefined;
        enforce_dependencies?: boolean | undefined;
        warn_missing_fields?: boolean | undefined;
        error_on_warnings?: boolean | undefined;
        allow_wip_commits?: boolean | undefined;
        allow_cross_milestone_deps?: boolean | undefined;
        warn_draft_artifacts?: boolean | undefined;
        warn_blocked_artifacts?: boolean | undefined;
    }>>;
    branches: z.ZodOptional<z.ZodObject<{
        artifact_branch_format: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        cascade_branch_format: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        delete_after_merge: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        delete_cascade_branches: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        require_pr_for_main: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        allowed_direct_branches: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        artifact_branch_format: string;
        cascade_branch_format: string;
        delete_after_merge: boolean;
        delete_cascade_branches: boolean;
        require_pr_for_main: boolean;
        allowed_direct_branches: string[];
    }, {
        artifact_branch_format?: string | undefined;
        cascade_branch_format?: string | undefined;
        delete_after_merge?: boolean | undefined;
        delete_cascade_branches?: boolean | undefined;
        require_pr_for_main?: boolean | undefined;
        allowed_direct_branches?: string[] | undefined;
    }>>;
    commits: z.ZodOptional<z.ZodObject<{
        format: z.ZodDefault<z.ZodOptional<z.ZodEnum<["conventional", "simple", "custom"]>>>;
        conventional: z.ZodOptional<z.ZodObject<{
            type_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            scope: z.ZodOptional<z.ZodString>;
            breaking_change_marker: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            type_prefix: string;
            breaking_change_marker: string;
            scope?: string | undefined;
        }, {
            type_prefix?: string | undefined;
            scope?: string | undefined;
            breaking_change_marker?: string | undefined;
        }>>;
        custom_template: z.ZodOptional<z.ZodString>;
        cascade_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        validation_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        add_coauthor: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        agent_email_format: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        format: "conventional" | "simple" | "custom";
        cascade_prefix: string;
        validation_prefix: string;
        add_coauthor: boolean;
        agent_email_format: string;
        conventional?: {
            type_prefix: string;
            breaking_change_marker: string;
            scope?: string | undefined;
        } | undefined;
        custom_template?: string | undefined;
    }, {
        conventional?: {
            type_prefix?: string | undefined;
            scope?: string | undefined;
            breaking_change_marker?: string | undefined;
        } | undefined;
        format?: "conventional" | "simple" | "custom" | undefined;
        custom_template?: string | undefined;
        cascade_prefix?: string | undefined;
        validation_prefix?: string | undefined;
        add_coauthor?: boolean | undefined;
        agent_email_format?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    validation?: {
        enforce_schema: boolean;
        enforce_state_machine: boolean;
        enforce_dependencies: boolean;
        warn_missing_fields: boolean;
        error_on_warnings: boolean;
        allow_wip_commits: boolean;
        allow_cross_milestone_deps: boolean;
        warn_draft_artifacts: boolean;
        warn_blocked_artifacts: boolean;
    } | undefined;
    post_checkout?: {
        create_draft_pr: boolean;
        pr_template: string;
        auto_assign: boolean;
        auto_add_labels: boolean;
        notify_team: boolean;
    } | undefined;
    post_merge?: {
        strategy: "cascade_pr" | "direct_commit" | "manual";
        cascade_pr?: {
            auto_merge: boolean;
            require_checks: boolean;
            labels: string[];
            branch_prefix: string;
            delete_branch: boolean;
        } | undefined;
        direct_commit?: {
            commit_prefix: string;
            push_immediately: boolean;
        } | undefined;
    } | undefined;
    hooks?: {
        enabled: boolean;
        non_blocking: boolean;
        log_errors: boolean;
        log_level: "debug" | "info" | "warn" | "error";
        post_checkout?: {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
        post_merge?: {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
        pre_commit?: {
            validate_schema: boolean;
            validate_state_machine: boolean;
            validate_dependencies: boolean;
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
        pre_push?: {
            warn_wip_artifacts: boolean;
            warn_non_artifact_branches: boolean;
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
    } | undefined;
    platform?: {
        type: "github" | "gitlab" | "bitbucket";
        auth_strategy: "auto" | "token" | "cli";
        github?: {
            api_url: string;
            token_env_var: string;
        } | undefined;
        gitlab?: {
            api_url: string;
            token_env_var: string;
        } | undefined;
        bitbucket?: {
            api_url: string;
            token_env_var: string;
        } | undefined;
    } | undefined;
    pr_creation?: {
        auto_assign: boolean;
        auto_add_labels: boolean;
        title_template: string;
        body_template: string;
        auto_request_reviewers: boolean;
        additional_labels: string[];
        default_reviewers: string[];
        link_milestone: boolean;
        add_to_project: boolean;
        project_id?: string | undefined;
    } | undefined;
    cascades?: {
        mode: "manual" | "immediate" | "batched";
        batch_delay_seconds: number;
        max_batch_size: number;
        parallel_execution: boolean;
        max_parallelism: number;
        dry_run: boolean;
        require_confirmation: boolean;
    } | undefined;
    branches?: {
        artifact_branch_format: string;
        cascade_branch_format: string;
        delete_after_merge: boolean;
        delete_cascade_branches: boolean;
        require_pr_for_main: boolean;
        allowed_direct_branches: string[];
    } | undefined;
    commits?: {
        format: "conventional" | "simple" | "custom";
        cascade_prefix: string;
        validation_prefix: string;
        add_coauthor: boolean;
        agent_email_format: string;
        conventional?: {
            type_prefix: string;
            breaking_change_marker: string;
            scope?: string | undefined;
        } | undefined;
        custom_template?: string | undefined;
    } | undefined;
}, {
    validation?: {
        enforce_schema?: boolean | undefined;
        enforce_state_machine?: boolean | undefined;
        enforce_dependencies?: boolean | undefined;
        warn_missing_fields?: boolean | undefined;
        error_on_warnings?: boolean | undefined;
        allow_wip_commits?: boolean | undefined;
        allow_cross_milestone_deps?: boolean | undefined;
        warn_draft_artifacts?: boolean | undefined;
        warn_blocked_artifacts?: boolean | undefined;
    } | undefined;
    post_checkout?: {
        create_draft_pr?: boolean | undefined;
        pr_template?: string | undefined;
        auto_assign?: boolean | undefined;
        auto_add_labels?: boolean | undefined;
        notify_team?: boolean | undefined;
    } | undefined;
    post_merge?: {
        cascade_pr?: {
            auto_merge?: boolean | undefined;
            require_checks?: boolean | undefined;
            labels?: string[] | undefined;
            branch_prefix?: string | undefined;
            delete_branch?: boolean | undefined;
        } | undefined;
        direct_commit?: {
            commit_prefix?: string | undefined;
            push_immediately?: boolean | undefined;
        } | undefined;
        strategy?: "cascade_pr" | "direct_commit" | "manual" | undefined;
    } | undefined;
    hooks?: {
        enabled?: boolean | undefined;
        non_blocking?: boolean | undefined;
        log_errors?: boolean | undefined;
        log_level?: "debug" | "info" | "warn" | "error" | undefined;
        post_checkout?: {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
        post_merge?: {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
        pre_commit?: {
            validate_schema?: boolean | undefined;
            validate_state_machine?: boolean | undefined;
            validate_dependencies?: boolean | undefined;
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
        pre_push?: {
            warn_wip_artifacts?: boolean | undefined;
            warn_non_artifact_branches?: boolean | undefined;
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            script?: string | undefined;
        } | undefined;
    } | undefined;
    platform?: {
        github?: {
            api_url?: string | undefined;
            token_env_var?: string | undefined;
        } | undefined;
        gitlab?: {
            api_url?: string | undefined;
            token_env_var?: string | undefined;
        } | undefined;
        bitbucket?: {
            api_url?: string | undefined;
            token_env_var?: string | undefined;
        } | undefined;
        type?: "github" | "gitlab" | "bitbucket" | undefined;
        auth_strategy?: "auto" | "token" | "cli" | undefined;
    } | undefined;
    pr_creation?: {
        auto_assign?: boolean | undefined;
        auto_add_labels?: boolean | undefined;
        title_template?: string | undefined;
        body_template?: string | undefined;
        auto_request_reviewers?: boolean | undefined;
        additional_labels?: string[] | undefined;
        default_reviewers?: string[] | undefined;
        link_milestone?: boolean | undefined;
        add_to_project?: boolean | undefined;
        project_id?: string | undefined;
    } | undefined;
    cascades?: {
        mode?: "manual" | "immediate" | "batched" | undefined;
        batch_delay_seconds?: number | undefined;
        max_batch_size?: number | undefined;
        parallel_execution?: boolean | undefined;
        max_parallelism?: number | undefined;
        dry_run?: boolean | undefined;
        require_confirmation?: boolean | undefined;
    } | undefined;
    branches?: {
        artifact_branch_format?: string | undefined;
        cascade_branch_format?: string | undefined;
        delete_after_merge?: boolean | undefined;
        delete_cascade_branches?: boolean | undefined;
        require_pr_for_main?: boolean | undefined;
        allowed_direct_branches?: string[] | undefined;
    } | undefined;
    commits?: {
        conventional?: {
            type_prefix?: string | undefined;
            scope?: string | undefined;
            breaking_change_marker?: string | undefined;
        } | undefined;
        format?: "conventional" | "simple" | "custom" | undefined;
        custom_template?: string | undefined;
        cascade_prefix?: string | undefined;
        validation_prefix?: string | undefined;
        add_coauthor?: boolean | undefined;
        agent_email_format?: string | undefined;
    } | undefined;
}>;
/**
 * Root Kodebase configuration schema.
 */
export declare const kodebaseConfigSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    gitOps: z.ZodOptional<z.ZodObject<{
        post_merge: z.ZodOptional<z.ZodObject<{
            strategy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["cascade_pr", "direct_commit", "manual"]>>>;
            cascade_pr: z.ZodOptional<z.ZodObject<{
                auto_merge: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                require_checks: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                labels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                branch_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
                delete_branch: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            }, "strip", z.ZodTypeAny, {
                auto_merge: boolean;
                require_checks: boolean;
                labels: string[];
                branch_prefix: string;
                delete_branch: boolean;
            }, {
                auto_merge?: boolean | undefined;
                require_checks?: boolean | undefined;
                labels?: string[] | undefined;
                branch_prefix?: string | undefined;
                delete_branch?: boolean | undefined;
            }>>;
            direct_commit: z.ZodOptional<z.ZodObject<{
                commit_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
                push_immediately: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            }, "strip", z.ZodTypeAny, {
                commit_prefix: string;
                push_immediately: boolean;
            }, {
                commit_prefix?: string | undefined;
                push_immediately?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "cascade_pr" | "direct_commit" | "manual";
            cascade_pr?: {
                auto_merge: boolean;
                require_checks: boolean;
                labels: string[];
                branch_prefix: string;
                delete_branch: boolean;
            } | undefined;
            direct_commit?: {
                commit_prefix: string;
                push_immediately: boolean;
            } | undefined;
        }, {
            cascade_pr?: {
                auto_merge?: boolean | undefined;
                require_checks?: boolean | undefined;
                labels?: string[] | undefined;
                branch_prefix?: string | undefined;
                delete_branch?: boolean | undefined;
            } | undefined;
            direct_commit?: {
                commit_prefix?: string | undefined;
                push_immediately?: boolean | undefined;
            } | undefined;
            strategy?: "cascade_pr" | "direct_commit" | "manual" | undefined;
        }>>;
        post_checkout: z.ZodOptional<z.ZodObject<{
            create_draft_pr: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            pr_template: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            auto_assign: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            auto_add_labels: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            notify_team: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            create_draft_pr: boolean;
            pr_template: string;
            auto_assign: boolean;
            auto_add_labels: boolean;
            notify_team: boolean;
        }, {
            create_draft_pr?: boolean | undefined;
            pr_template?: string | undefined;
            auto_assign?: boolean | undefined;
            auto_add_labels?: boolean | undefined;
            notify_team?: boolean | undefined;
        }>>;
        hooks: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            non_blocking: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            log_errors: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            log_level: z.ZodDefault<z.ZodOptional<z.ZodEnum<["debug", "info", "warn", "error"]>>>;
            post_checkout: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodOptional<z.ZodBoolean>;
                non_blocking: z.ZodOptional<z.ZodBoolean>;
                script: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            }, {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            }>>;
            post_merge: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodOptional<z.ZodBoolean>;
                non_blocking: z.ZodOptional<z.ZodBoolean>;
                script: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            }, {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            }>>;
            pre_commit: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodOptional<z.ZodBoolean>;
                non_blocking: z.ZodOptional<z.ZodBoolean>;
                script: z.ZodOptional<z.ZodString>;
            } & {
                validate_schema: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                validate_state_machine: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                validate_dependencies: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            }, "strip", z.ZodTypeAny, {
                validate_schema: boolean;
                validate_state_machine: boolean;
                validate_dependencies: boolean;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            }, {
                validate_schema?: boolean | undefined;
                validate_state_machine?: boolean | undefined;
                validate_dependencies?: boolean | undefined;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            }>>;
            pre_push: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodOptional<z.ZodBoolean>;
                non_blocking: z.ZodOptional<z.ZodBoolean>;
                script: z.ZodOptional<z.ZodString>;
            } & {
                warn_wip_artifacts: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                warn_non_artifact_branches: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            }, "strip", z.ZodTypeAny, {
                warn_wip_artifacts: boolean;
                warn_non_artifact_branches: boolean;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            }, {
                warn_wip_artifacts?: boolean | undefined;
                warn_non_artifact_branches?: boolean | undefined;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            non_blocking: boolean;
            log_errors: boolean;
            log_level: "debug" | "info" | "warn" | "error";
            post_checkout?: {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            post_merge?: {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            pre_commit?: {
                validate_schema: boolean;
                validate_state_machine: boolean;
                validate_dependencies: boolean;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            pre_push?: {
                warn_wip_artifacts: boolean;
                warn_non_artifact_branches: boolean;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
        }, {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            log_errors?: boolean | undefined;
            log_level?: "debug" | "info" | "warn" | "error" | undefined;
            post_checkout?: {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            post_merge?: {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            pre_commit?: {
                validate_schema?: boolean | undefined;
                validate_state_machine?: boolean | undefined;
                validate_dependencies?: boolean | undefined;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            pre_push?: {
                warn_wip_artifacts?: boolean | undefined;
                warn_non_artifact_branches?: boolean | undefined;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
        }>>;
        platform: z.ZodOptional<z.ZodObject<{
            type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["github", "gitlab", "bitbucket"]>>>;
            auth_strategy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["auto", "token", "cli"]>>>;
            github: z.ZodOptional<z.ZodObject<{
                api_url: z.ZodDefault<z.ZodOptional<z.ZodString>>;
                token_env_var: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                api_url: string;
                token_env_var: string;
            }, {
                api_url?: string | undefined;
                token_env_var?: string | undefined;
            }>>;
            gitlab: z.ZodOptional<z.ZodObject<{
                api_url: z.ZodDefault<z.ZodOptional<z.ZodString>>;
                token_env_var: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                api_url: string;
                token_env_var: string;
            }, {
                api_url?: string | undefined;
                token_env_var?: string | undefined;
            }>>;
            bitbucket: z.ZodOptional<z.ZodObject<{
                api_url: z.ZodDefault<z.ZodOptional<z.ZodString>>;
                token_env_var: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                api_url: string;
                token_env_var: string;
            }, {
                api_url?: string | undefined;
                token_env_var?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "github" | "gitlab" | "bitbucket";
            auth_strategy: "auto" | "token" | "cli";
            github?: {
                api_url: string;
                token_env_var: string;
            } | undefined;
            gitlab?: {
                api_url: string;
                token_env_var: string;
            } | undefined;
            bitbucket?: {
                api_url: string;
                token_env_var: string;
            } | undefined;
        }, {
            github?: {
                api_url?: string | undefined;
                token_env_var?: string | undefined;
            } | undefined;
            gitlab?: {
                api_url?: string | undefined;
                token_env_var?: string | undefined;
            } | undefined;
            bitbucket?: {
                api_url?: string | undefined;
                token_env_var?: string | undefined;
            } | undefined;
            type?: "github" | "gitlab" | "bitbucket" | undefined;
            auth_strategy?: "auto" | "token" | "cli" | undefined;
        }>>;
        pr_creation: z.ZodOptional<z.ZodObject<{
            title_template: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            body_template: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            auto_assign: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            auto_add_labels: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            auto_request_reviewers: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            additional_labels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            default_reviewers: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            link_milestone: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            add_to_project: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            project_id: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            auto_assign: boolean;
            auto_add_labels: boolean;
            title_template: string;
            body_template: string;
            auto_request_reviewers: boolean;
            additional_labels: string[];
            default_reviewers: string[];
            link_milestone: boolean;
            add_to_project: boolean;
            project_id?: string | undefined;
        }, {
            auto_assign?: boolean | undefined;
            auto_add_labels?: boolean | undefined;
            title_template?: string | undefined;
            body_template?: string | undefined;
            auto_request_reviewers?: boolean | undefined;
            additional_labels?: string[] | undefined;
            default_reviewers?: string[] | undefined;
            link_milestone?: boolean | undefined;
            add_to_project?: boolean | undefined;
            project_id?: string | undefined;
        }>>;
        cascades: z.ZodOptional<z.ZodObject<{
            mode: z.ZodDefault<z.ZodOptional<z.ZodEnum<["immediate", "batched", "manual"]>>>;
            batch_delay_seconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            max_batch_size: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            parallel_execution: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            max_parallelism: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            dry_run: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            require_confirmation: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            mode: "manual" | "immediate" | "batched";
            batch_delay_seconds: number;
            max_batch_size: number;
            parallel_execution: boolean;
            max_parallelism: number;
            dry_run: boolean;
            require_confirmation: boolean;
        }, {
            mode?: "manual" | "immediate" | "batched" | undefined;
            batch_delay_seconds?: number | undefined;
            max_batch_size?: number | undefined;
            parallel_execution?: boolean | undefined;
            max_parallelism?: number | undefined;
            dry_run?: boolean | undefined;
            require_confirmation?: boolean | undefined;
        }>>;
        validation: z.ZodOptional<z.ZodObject<{
            enforce_schema: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            enforce_state_machine: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            enforce_dependencies: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            warn_missing_fields: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            error_on_warnings: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            allow_wip_commits: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            allow_cross_milestone_deps: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            warn_draft_artifacts: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            warn_blocked_artifacts: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            enforce_schema: boolean;
            enforce_state_machine: boolean;
            enforce_dependencies: boolean;
            warn_missing_fields: boolean;
            error_on_warnings: boolean;
            allow_wip_commits: boolean;
            allow_cross_milestone_deps: boolean;
            warn_draft_artifacts: boolean;
            warn_blocked_artifacts: boolean;
        }, {
            enforce_schema?: boolean | undefined;
            enforce_state_machine?: boolean | undefined;
            enforce_dependencies?: boolean | undefined;
            warn_missing_fields?: boolean | undefined;
            error_on_warnings?: boolean | undefined;
            allow_wip_commits?: boolean | undefined;
            allow_cross_milestone_deps?: boolean | undefined;
            warn_draft_artifacts?: boolean | undefined;
            warn_blocked_artifacts?: boolean | undefined;
        }>>;
        branches: z.ZodOptional<z.ZodObject<{
            artifact_branch_format: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            cascade_branch_format: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            delete_after_merge: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            delete_cascade_branches: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            require_pr_for_main: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            allowed_direct_branches: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            artifact_branch_format: string;
            cascade_branch_format: string;
            delete_after_merge: boolean;
            delete_cascade_branches: boolean;
            require_pr_for_main: boolean;
            allowed_direct_branches: string[];
        }, {
            artifact_branch_format?: string | undefined;
            cascade_branch_format?: string | undefined;
            delete_after_merge?: boolean | undefined;
            delete_cascade_branches?: boolean | undefined;
            require_pr_for_main?: boolean | undefined;
            allowed_direct_branches?: string[] | undefined;
        }>>;
        commits: z.ZodOptional<z.ZodObject<{
            format: z.ZodDefault<z.ZodOptional<z.ZodEnum<["conventional", "simple", "custom"]>>>;
            conventional: z.ZodOptional<z.ZodObject<{
                type_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
                scope: z.ZodOptional<z.ZodString>;
                breaking_change_marker: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                type_prefix: string;
                breaking_change_marker: string;
                scope?: string | undefined;
            }, {
                type_prefix?: string | undefined;
                scope?: string | undefined;
                breaking_change_marker?: string | undefined;
            }>>;
            custom_template: z.ZodOptional<z.ZodString>;
            cascade_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            validation_prefix: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            add_coauthor: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            agent_email_format: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            format: "conventional" | "simple" | "custom";
            cascade_prefix: string;
            validation_prefix: string;
            add_coauthor: boolean;
            agent_email_format: string;
            conventional?: {
                type_prefix: string;
                breaking_change_marker: string;
                scope?: string | undefined;
            } | undefined;
            custom_template?: string | undefined;
        }, {
            conventional?: {
                type_prefix?: string | undefined;
                scope?: string | undefined;
                breaking_change_marker?: string | undefined;
            } | undefined;
            format?: "conventional" | "simple" | "custom" | undefined;
            custom_template?: string | undefined;
            cascade_prefix?: string | undefined;
            validation_prefix?: string | undefined;
            add_coauthor?: boolean | undefined;
            agent_email_format?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        validation?: {
            enforce_schema: boolean;
            enforce_state_machine: boolean;
            enforce_dependencies: boolean;
            warn_missing_fields: boolean;
            error_on_warnings: boolean;
            allow_wip_commits: boolean;
            allow_cross_milestone_deps: boolean;
            warn_draft_artifacts: boolean;
            warn_blocked_artifacts: boolean;
        } | undefined;
        post_checkout?: {
            create_draft_pr: boolean;
            pr_template: string;
            auto_assign: boolean;
            auto_add_labels: boolean;
            notify_team: boolean;
        } | undefined;
        post_merge?: {
            strategy: "cascade_pr" | "direct_commit" | "manual";
            cascade_pr?: {
                auto_merge: boolean;
                require_checks: boolean;
                labels: string[];
                branch_prefix: string;
                delete_branch: boolean;
            } | undefined;
            direct_commit?: {
                commit_prefix: string;
                push_immediately: boolean;
            } | undefined;
        } | undefined;
        hooks?: {
            enabled: boolean;
            non_blocking: boolean;
            log_errors: boolean;
            log_level: "debug" | "info" | "warn" | "error";
            post_checkout?: {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            post_merge?: {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            pre_commit?: {
                validate_schema: boolean;
                validate_state_machine: boolean;
                validate_dependencies: boolean;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            pre_push?: {
                warn_wip_artifacts: boolean;
                warn_non_artifact_branches: boolean;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
        } | undefined;
        platform?: {
            type: "github" | "gitlab" | "bitbucket";
            auth_strategy: "auto" | "token" | "cli";
            github?: {
                api_url: string;
                token_env_var: string;
            } | undefined;
            gitlab?: {
                api_url: string;
                token_env_var: string;
            } | undefined;
            bitbucket?: {
                api_url: string;
                token_env_var: string;
            } | undefined;
        } | undefined;
        pr_creation?: {
            auto_assign: boolean;
            auto_add_labels: boolean;
            title_template: string;
            body_template: string;
            auto_request_reviewers: boolean;
            additional_labels: string[];
            default_reviewers: string[];
            link_milestone: boolean;
            add_to_project: boolean;
            project_id?: string | undefined;
        } | undefined;
        cascades?: {
            mode: "manual" | "immediate" | "batched";
            batch_delay_seconds: number;
            max_batch_size: number;
            parallel_execution: boolean;
            max_parallelism: number;
            dry_run: boolean;
            require_confirmation: boolean;
        } | undefined;
        branches?: {
            artifact_branch_format: string;
            cascade_branch_format: string;
            delete_after_merge: boolean;
            delete_cascade_branches: boolean;
            require_pr_for_main: boolean;
            allowed_direct_branches: string[];
        } | undefined;
        commits?: {
            format: "conventional" | "simple" | "custom";
            cascade_prefix: string;
            validation_prefix: string;
            add_coauthor: boolean;
            agent_email_format: string;
            conventional?: {
                type_prefix: string;
                breaking_change_marker: string;
                scope?: string | undefined;
            } | undefined;
            custom_template?: string | undefined;
        } | undefined;
    }, {
        validation?: {
            enforce_schema?: boolean | undefined;
            enforce_state_machine?: boolean | undefined;
            enforce_dependencies?: boolean | undefined;
            warn_missing_fields?: boolean | undefined;
            error_on_warnings?: boolean | undefined;
            allow_wip_commits?: boolean | undefined;
            allow_cross_milestone_deps?: boolean | undefined;
            warn_draft_artifacts?: boolean | undefined;
            warn_blocked_artifacts?: boolean | undefined;
        } | undefined;
        post_checkout?: {
            create_draft_pr?: boolean | undefined;
            pr_template?: string | undefined;
            auto_assign?: boolean | undefined;
            auto_add_labels?: boolean | undefined;
            notify_team?: boolean | undefined;
        } | undefined;
        post_merge?: {
            cascade_pr?: {
                auto_merge?: boolean | undefined;
                require_checks?: boolean | undefined;
                labels?: string[] | undefined;
                branch_prefix?: string | undefined;
                delete_branch?: boolean | undefined;
            } | undefined;
            direct_commit?: {
                commit_prefix?: string | undefined;
                push_immediately?: boolean | undefined;
            } | undefined;
            strategy?: "cascade_pr" | "direct_commit" | "manual" | undefined;
        } | undefined;
        hooks?: {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            log_errors?: boolean | undefined;
            log_level?: "debug" | "info" | "warn" | "error" | undefined;
            post_checkout?: {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            post_merge?: {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            pre_commit?: {
                validate_schema?: boolean | undefined;
                validate_state_machine?: boolean | undefined;
                validate_dependencies?: boolean | undefined;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            pre_push?: {
                warn_wip_artifacts?: boolean | undefined;
                warn_non_artifact_branches?: boolean | undefined;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
        } | undefined;
        platform?: {
            github?: {
                api_url?: string | undefined;
                token_env_var?: string | undefined;
            } | undefined;
            gitlab?: {
                api_url?: string | undefined;
                token_env_var?: string | undefined;
            } | undefined;
            bitbucket?: {
                api_url?: string | undefined;
                token_env_var?: string | undefined;
            } | undefined;
            type?: "github" | "gitlab" | "bitbucket" | undefined;
            auth_strategy?: "auto" | "token" | "cli" | undefined;
        } | undefined;
        pr_creation?: {
            auto_assign?: boolean | undefined;
            auto_add_labels?: boolean | undefined;
            title_template?: string | undefined;
            body_template?: string | undefined;
            auto_request_reviewers?: boolean | undefined;
            additional_labels?: string[] | undefined;
            default_reviewers?: string[] | undefined;
            link_milestone?: boolean | undefined;
            add_to_project?: boolean | undefined;
            project_id?: string | undefined;
        } | undefined;
        cascades?: {
            mode?: "manual" | "immediate" | "batched" | undefined;
            batch_delay_seconds?: number | undefined;
            max_batch_size?: number | undefined;
            parallel_execution?: boolean | undefined;
            max_parallelism?: number | undefined;
            dry_run?: boolean | undefined;
            require_confirmation?: boolean | undefined;
        } | undefined;
        branches?: {
            artifact_branch_format?: string | undefined;
            cascade_branch_format?: string | undefined;
            delete_after_merge?: boolean | undefined;
            delete_cascade_branches?: boolean | undefined;
            require_pr_for_main?: boolean | undefined;
            allowed_direct_branches?: string[] | undefined;
        } | undefined;
        commits?: {
            conventional?: {
                type_prefix?: string | undefined;
                scope?: string | undefined;
                breaking_change_marker?: string | undefined;
            } | undefined;
            format?: "conventional" | "simple" | "custom" | undefined;
            custom_template?: string | undefined;
            cascade_prefix?: string | undefined;
            validation_prefix?: string | undefined;
            add_coauthor?: boolean | undefined;
            agent_email_format?: string | undefined;
        } | undefined;
    }>>;
    artifactsDir: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    version: string;
    artifactsDir: string;
    gitOps?: {
        validation?: {
            enforce_schema: boolean;
            enforce_state_machine: boolean;
            enforce_dependencies: boolean;
            warn_missing_fields: boolean;
            error_on_warnings: boolean;
            allow_wip_commits: boolean;
            allow_cross_milestone_deps: boolean;
            warn_draft_artifacts: boolean;
            warn_blocked_artifacts: boolean;
        } | undefined;
        post_checkout?: {
            create_draft_pr: boolean;
            pr_template: string;
            auto_assign: boolean;
            auto_add_labels: boolean;
            notify_team: boolean;
        } | undefined;
        post_merge?: {
            strategy: "cascade_pr" | "direct_commit" | "manual";
            cascade_pr?: {
                auto_merge: boolean;
                require_checks: boolean;
                labels: string[];
                branch_prefix: string;
                delete_branch: boolean;
            } | undefined;
            direct_commit?: {
                commit_prefix: string;
                push_immediately: boolean;
            } | undefined;
        } | undefined;
        hooks?: {
            enabled: boolean;
            non_blocking: boolean;
            log_errors: boolean;
            log_level: "debug" | "info" | "warn" | "error";
            post_checkout?: {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            post_merge?: {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            pre_commit?: {
                validate_schema: boolean;
                validate_state_machine: boolean;
                validate_dependencies: boolean;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            pre_push?: {
                warn_wip_artifacts: boolean;
                warn_non_artifact_branches: boolean;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
        } | undefined;
        platform?: {
            type: "github" | "gitlab" | "bitbucket";
            auth_strategy: "auto" | "token" | "cli";
            github?: {
                api_url: string;
                token_env_var: string;
            } | undefined;
            gitlab?: {
                api_url: string;
                token_env_var: string;
            } | undefined;
            bitbucket?: {
                api_url: string;
                token_env_var: string;
            } | undefined;
        } | undefined;
        pr_creation?: {
            auto_assign: boolean;
            auto_add_labels: boolean;
            title_template: string;
            body_template: string;
            auto_request_reviewers: boolean;
            additional_labels: string[];
            default_reviewers: string[];
            link_milestone: boolean;
            add_to_project: boolean;
            project_id?: string | undefined;
        } | undefined;
        cascades?: {
            mode: "manual" | "immediate" | "batched";
            batch_delay_seconds: number;
            max_batch_size: number;
            parallel_execution: boolean;
            max_parallelism: number;
            dry_run: boolean;
            require_confirmation: boolean;
        } | undefined;
        branches?: {
            artifact_branch_format: string;
            cascade_branch_format: string;
            delete_after_merge: boolean;
            delete_cascade_branches: boolean;
            require_pr_for_main: boolean;
            allowed_direct_branches: string[];
        } | undefined;
        commits?: {
            format: "conventional" | "simple" | "custom";
            cascade_prefix: string;
            validation_prefix: string;
            add_coauthor: boolean;
            agent_email_format: string;
            conventional?: {
                type_prefix: string;
                breaking_change_marker: string;
                scope?: string | undefined;
            } | undefined;
            custom_template?: string | undefined;
        } | undefined;
    } | undefined;
}, {
    version?: string | undefined;
    gitOps?: {
        validation?: {
            enforce_schema?: boolean | undefined;
            enforce_state_machine?: boolean | undefined;
            enforce_dependencies?: boolean | undefined;
            warn_missing_fields?: boolean | undefined;
            error_on_warnings?: boolean | undefined;
            allow_wip_commits?: boolean | undefined;
            allow_cross_milestone_deps?: boolean | undefined;
            warn_draft_artifacts?: boolean | undefined;
            warn_blocked_artifacts?: boolean | undefined;
        } | undefined;
        post_checkout?: {
            create_draft_pr?: boolean | undefined;
            pr_template?: string | undefined;
            auto_assign?: boolean | undefined;
            auto_add_labels?: boolean | undefined;
            notify_team?: boolean | undefined;
        } | undefined;
        post_merge?: {
            cascade_pr?: {
                auto_merge?: boolean | undefined;
                require_checks?: boolean | undefined;
                labels?: string[] | undefined;
                branch_prefix?: string | undefined;
                delete_branch?: boolean | undefined;
            } | undefined;
            direct_commit?: {
                commit_prefix?: string | undefined;
                push_immediately?: boolean | undefined;
            } | undefined;
            strategy?: "cascade_pr" | "direct_commit" | "manual" | undefined;
        } | undefined;
        hooks?: {
            enabled?: boolean | undefined;
            non_blocking?: boolean | undefined;
            log_errors?: boolean | undefined;
            log_level?: "debug" | "info" | "warn" | "error" | undefined;
            post_checkout?: {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            post_merge?: {
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            pre_commit?: {
                validate_schema?: boolean | undefined;
                validate_state_machine?: boolean | undefined;
                validate_dependencies?: boolean | undefined;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
            pre_push?: {
                warn_wip_artifacts?: boolean | undefined;
                warn_non_artifact_branches?: boolean | undefined;
                enabled?: boolean | undefined;
                non_blocking?: boolean | undefined;
                script?: string | undefined;
            } | undefined;
        } | undefined;
        platform?: {
            github?: {
                api_url?: string | undefined;
                token_env_var?: string | undefined;
            } | undefined;
            gitlab?: {
                api_url?: string | undefined;
                token_env_var?: string | undefined;
            } | undefined;
            bitbucket?: {
                api_url?: string | undefined;
                token_env_var?: string | undefined;
            } | undefined;
            type?: "github" | "gitlab" | "bitbucket" | undefined;
            auth_strategy?: "auto" | "token" | "cli" | undefined;
        } | undefined;
        pr_creation?: {
            auto_assign?: boolean | undefined;
            auto_add_labels?: boolean | undefined;
            title_template?: string | undefined;
            body_template?: string | undefined;
            auto_request_reviewers?: boolean | undefined;
            additional_labels?: string[] | undefined;
            default_reviewers?: string[] | undefined;
            link_milestone?: boolean | undefined;
            add_to_project?: boolean | undefined;
            project_id?: string | undefined;
        } | undefined;
        cascades?: {
            mode?: "manual" | "immediate" | "batched" | undefined;
            batch_delay_seconds?: number | undefined;
            max_batch_size?: number | undefined;
            parallel_execution?: boolean | undefined;
            max_parallelism?: number | undefined;
            dry_run?: boolean | undefined;
            require_confirmation?: boolean | undefined;
        } | undefined;
        branches?: {
            artifact_branch_format?: string | undefined;
            cascade_branch_format?: string | undefined;
            delete_after_merge?: boolean | undefined;
            delete_cascade_branches?: boolean | undefined;
            require_pr_for_main?: boolean | undefined;
            allowed_direct_branches?: string[] | undefined;
        } | undefined;
        commits?: {
            conventional?: {
                type_prefix?: string | undefined;
                scope?: string | undefined;
                breaking_change_marker?: string | undefined;
            } | undefined;
            format?: "conventional" | "simple" | "custom" | undefined;
            custom_template?: string | undefined;
            cascade_prefix?: string | undefined;
            validation_prefix?: string | undefined;
            add_coauthor?: boolean | undefined;
            agent_email_format?: string | undefined;
        } | undefined;
    } | undefined;
    artifactsDir?: string | undefined;
}>;
/**
 * Validates a Kodebase configuration object.
 *
 * @param config - The configuration to validate
 * @returns The validated configuration with defaults applied
 * @throws {z.ZodError} If the configuration is invalid
 *
 * @example
 * ```typescript
 * const config = validateConfig({
 *   artifactsDir: ".kodebase/artifacts",
 *   gitOps: {
 *     post_merge: {
 *       strategy: "cascade_pr"
 *     }
 *   }
 * });
 * ```
 */
export declare function validateConfig(config: unknown): KodebaseConfig;
//# sourceMappingURL=validate-config.d.ts.map
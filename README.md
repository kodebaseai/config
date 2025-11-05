# @kodebase/config

Configuration system for Kodebase git operations. Provides flexible, validated configuration management with sensible defaults and preset workflows for different team sizes.

## Installation

```bash
pnpm add @kodebase/config
```

## Features

- **Type-safe configuration** with Zod validation
- **YAML-based** configuration files
- **Preset workflows** for solo, small team, and enterprise environments
- **Automatic defaults** - zero config required to get started
- **Migration utilities** for future version upgrades
- **100% test coverage**

## Quick Start

### Basic Usage

```typescript
import { loadConfig } from "@kodebase/config";

// Load configuration from .kodebase/config/settings.yml
// Falls back to defaults if file doesn't exist
const config = await loadConfig(process.cwd());

console.log(config.gitOps?.post_merge?.strategy); // "cascade_pr" (default)
```

### Using Presets

```typescript
import { presets, soloPreset, smallTeamPreset, enterprisePreset } from "@kodebase/config";

// Solo developer - fast, minimal overhead
const solo = soloPreset;
// direct_commit strategy, non-blocking hooks, minimal validation

// Small team - balanced collaboration
const smallTeam = smallTeamPreset;
// cascade_pr with auto-merge, draft PRs, balanced validation

// Enterprise - strict controls
const enterprise = enterprisePreset;
// cascade_pr without auto-merge, blocking hooks, strict validation

// Access via presets object
const config = presets.enterprise;
```

### Creating a Configuration File

Create `.kodebase/config/settings.yml`:

```yaml
version: "1.0"
artifactsDir: ".kodebase/artifacts"

gitOps:
  post_merge:
    strategy: cascade_pr
    cascade_pr:
      auto_merge: true
      require_checks: true
      labels:
        - automated
        - cascade

  post_checkout:
    create_draft_pr: true
    auto_assign: true

  hooks:
    enabled: true
    non_blocking: true

  platform:
    type: github
    auth_strategy: auto

  validation:
    enforce_schema: true
    enforce_state_machine: true
```

## API Reference

### Configuration Loading

#### `loadConfig(projectRoot, configPath?)`

Loads and validates Kodebase configuration from a YAML file.

```typescript
import { loadConfig } from "@kodebase/config";

// Load from default path (.kodebase/config/settings.yml)
const config = await loadConfig("/path/to/project");

// Load from custom path
const config = await loadConfig("/path/to/project", "custom-config.yml");

// Returns defaults if file doesn't exist
const config = await loadConfig("/non-existent/path");
// { version: "1.0", artifactsDir: ".kodebase/artifacts", ... }
```

**Parameters:**
- `projectRoot` (string): Path to project root directory
- `configPath` (string, optional): Custom config file path relative to project root

**Returns:** `Promise<KodebaseConfig>`

**Throws:** `ConfigLoadError` if file exists but is invalid

#### `getDefaultConfig()`

Returns the default configuration.

```typescript
import { getDefaultConfig } from "@kodebase/config";

const defaults = getDefaultConfig();
```

**Returns:** `KodebaseConfig`

### Configuration Validation

#### `validateConfig(config)`

Validates a configuration object and applies defaults.

```typescript
import { validateConfig } from "@kodebase/config";

try {
  const validated = validateConfig({
    artifactsDir: ".kodebase/artifacts",
    gitOps: {
      post_merge: {
        strategy: "cascade_pr"
      }
    }
  });
} catch (error) {
  // ZodError with detailed validation messages
}
```

**Parameters:**
- `config` (unknown): Configuration object to validate

**Returns:** `KodebaseConfig` with defaults applied

**Throws:** `ZodError` if validation fails

### Migration Utilities

#### `migrateConfig(config, options?)`

Migrates configuration between versions (currently v1.0 only).

```typescript
import { migrateConfig } from "@kodebase/config";

const result = migrateConfig(oldConfig);
// { config: KodebaseConfig, warnings: DeprecationWarning[] }

// Explicit version migration
const result = migrateConfig(oldConfig, {
  fromVersion: "1.0",
  toVersion: "1.0"
});

// Check for deprecation warnings
if (result.warnings.length > 0) {
  console.warn("Deprecations:", result.warnings);
}
```

**Parameters:**
- `config` (unknown): Configuration to migrate
- `options.fromVersion` (ConfigVersion, optional): Source version (auto-detected if omitted)
- `options.toVersion` (ConfigVersion, optional): Target version (defaults to latest)

**Returns:** `MigrationResult` with config and deprecation warnings

#### `detectVersion(config)`

Detects the version of a configuration object.

```typescript
import { detectVersion } from "@kodebase/config";

const version = detectVersion({ version: "1.0", artifactsDir: "..." });
// => "1.0"

const version = detectVersion({ artifactsDir: "..." });
// => "1.0" (default)
```

**Parameters:**
- `config` (unknown): Configuration object to inspect

**Returns:** `ConfigVersion`

### Presets

#### Solo Preset

Best for individual developers and rapid prototyping.

```typescript
import { soloPreset } from "@kodebase/config";

// Key features:
// - Direct commits (no PRs)
// - Non-blocking hooks
// - Minimal validation
// - Auto-push immediately
```

**Use cases:**
- Individual developers working alone
- Rapid prototyping and experimentation
- Small personal projects

#### Small Team Preset

Balanced workflow for collaborative teams.

```typescript
import { smallTeamPreset } from "@kodebase/config";

// Key features:
// - Cascade PRs with auto-merge
// - Draft PRs enabled
// - Non-blocking hooks
// - Balanced validation
```

**Use cases:**
- Small collaborative teams (2-10 developers)
- Startups and growing projects
- Teams with moderate CI/CD requirements

#### Enterprise Preset

Strict controls for large organizations.

```typescript
import { enterprisePreset } from "@kodebase/config";

// Key features:
// - Cascade PRs requiring manual approval
// - Blocking hooks
// - Strict validation
// - Batched cascade mode
```

**Use cases:**
- Large organizations with compliance requirements
- Projects requiring strict code review
- Teams with complex approval workflows

## Configuration Schema

### Root Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `version` | string | `"1.0"` | Configuration version |
| `artifactsDir` | string | `".kodebase/artifacts"` | Base directory for artifacts |
| `gitOps` | GitOpsConfig | See below | Git operations configuration |

### GitOps Configuration

| Field | Type | Description |
|-------|------|-------------|
| `post_merge` | PostMergeConfig | Post-merge cascade behavior |
| `post_checkout` | PostCheckoutConfig | Post-checkout PR creation |
| `hooks` | HooksConfig | Git hooks configuration |
| `platform` | PlatformConfig | Platform-specific settings |
| `pr_creation` | PRCreationConfig | PR creation settings |
| `cascades` | CascadesConfig | Cascade execution settings |
| `validation` | ValidationConfig | Validation rules |
| `branches` | BranchesConfig | Branch management |
| `commits` | CommitsConfig | Commit message formatting |

### Post-Merge Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `strategy` | `"cascade_pr"` \| `"direct_commit"` \| `"manual"` | `"cascade_pr"` | Cascade strategy |
| `cascade_pr.auto_merge` | boolean | `true` | Auto-merge when checks pass |
| `cascade_pr.require_checks` | boolean | `true` | Require checks before merge |
| `cascade_pr.labels` | string[] | `["cascade", "automated"]` | Labels for cascade PRs |
| `direct_commit.push_immediately` | boolean | `true` | Push after commit |

### Hooks Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | boolean | `true` | Master switch for hooks |
| `non_blocking` | boolean | `true` | Non-blocking by default |
| `pre_commit.validate_schema` | boolean | `true` | Validate artifact schema |
| `pre_commit.validate_state_machine` | boolean | `true` | Validate state transitions |

### Validation Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enforce_schema` | boolean | `true` | Enforce schema validation |
| `enforce_state_machine` | boolean | `true` | Enforce state machine rules |
| `enforce_dependencies` | boolean | `true` | Enforce dependency validation |
| `error_on_warnings` | boolean | `false` | Treat warnings as errors |

## Error Handling

### ConfigLoadError

Thrown when configuration file exists but cannot be loaded or validated.

```typescript
import { ConfigLoadError, loadConfig } from "@kodebase/config";

try {
  const config = await loadConfig("/path/to/project");
} catch (error) {
  if (error instanceof ConfigLoadError) {
    console.error("Config error:", error.message);
    console.error("Caused by:", error.cause);
  }
}
```

**Common errors:**
- Invalid YAML syntax
- Schema validation failures
- Type mismatches
- Invalid enum values

## Examples

### Solo Developer Workflow

```yaml
# .kodebase/config/settings.yml
version: "1.0"
artifactsDir: ".kodebase/artifacts"

gitOps:
  post_merge:
    strategy: direct_commit
    direct_commit:
      push_immediately: true

  post_checkout:
    create_draft_pr: false

  hooks:
    enabled: true
    non_blocking: true
```

### Small Team Workflow

```yaml
# .kodebase/config/settings.yml
version: "1.0"
artifactsDir: ".kodebase/artifacts"

gitOps:
  post_merge:
    strategy: cascade_pr
    cascade_pr:
      auto_merge: true
      require_checks: true

  post_checkout:
    create_draft_pr: true
    auto_assign: true

  hooks:
    enabled: true
    non_blocking: true
```

### Enterprise Workflow

```yaml
# .kodebase/config/settings.yml
version: "1.0"
artifactsDir: ".kodebase/artifacts"

gitOps:
  post_merge:
    strategy: cascade_pr
    cascade_pr:
      auto_merge: false
      require_checks: true
      labels:
        - requires-review
        - cascade

  hooks:
    enabled: true
    non_blocking: false

  validation:
    enforce_schema: true
    enforce_state_machine: true
    enforce_dependencies: true
    error_on_warnings: true

  cascades:
    mode: batched
    require_confirmation: true
```

### Loading and Validating Custom Config

```typescript
import { loadConfig, validateConfig } from "@kodebase/config";

async function setupConfig() {
  // Try loading from file
  const config = await loadConfig(process.cwd());

  // Validate to ensure it meets requirements
  const validated = validateConfig(config);

  // Use validated config
  if (validated.gitOps?.post_merge?.strategy === "cascade_pr") {
    console.log("Using cascade PR strategy");
  }

  return validated;
}
```

### Migration Example

```typescript
import { migrateConfig, detectVersion } from "@kodebase/config";

async function upgradeConfig(oldConfig: unknown) {
  const version = detectVersion(oldConfig);
  console.log(`Current version: ${version}`);

  const result = migrateConfig(oldConfig);

  if (result.warnings.length > 0) {
    console.warn("Deprecation warnings:");
    result.warnings.forEach(w => {
      console.warn(`  [${w.field}]: ${w.message} (deprecated in v${w.version})`);
    });
  }

  return result.config;
}
```

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  KodebaseConfig,
  GitOpsConfig,
  PostMergeConfig,
  PostMergeStrategy,
  HooksConfig,
  ValidationConfig,
  ConfigPreset
} from "@kodebase/config";

const config: KodebaseConfig = {
  version: "1.0",
  artifactsDir: ".kodebase/artifacts",
  gitOps: {
    post_merge: {
      strategy: "cascade_pr"
    }
  }
};
```

## Testing

The package includes comprehensive tests:

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

**Test coverage:** 100% (statements, branches, functions, lines)

## License

MIT

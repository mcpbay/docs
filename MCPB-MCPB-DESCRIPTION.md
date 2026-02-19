# mcpb — MCPBay CLI

`mcpb` is the official command-line interface for [MCPBay](https://mcpbay.io), a marketplace for **MCP (Model Context Protocol) contexts**. It lets you browse, install, and serve versioned context packages — bundles of tools, prompts, and resources — directly into your AI tooling (e.g. Claude Code).

---

## What is a Context?

A **context** is a versioned, distributable package published on the MCPBay marketplace. Each context version contains three kinds of MCP primitives:

| Primitive | Description |
|-----------|-------------|
| **Tools** | Shell-command-backed executables exposed to the AI as callable functions |
| **Prompts** | Pre-configured prompt templates with optional arguments |
| **Resources** | Text or binary files the AI can read on demand |

Contexts are identified by a human-readable **slug** (e.g. `ctx-m55qa8`) and follow semver versioning.

---

## Architecture Overview

```
mcpbay.io API
     │  download context versions
     ▼
context_modules/          ← local cache of installed context versions
  <slug>/
    <version>.json
mcp-config.json           ← project-level import manifest
     │
     ▼
mcpb start-mcp            ← spawns an MCP server over stdio
     │  loads all installed contexts
     ▼
McpServerContext          ← implements the MCP server interface
  tools / prompts / resources aggregated from all contexts
     │
     ▼
AI tool (e.g. Claude Code) ← connects via MCP stdio transport
```

---

## CLI Commands

### `mcpb init [--with-claude]`
Initialises an MCPB project in the current directory:
- Creates `mcp-config.json` (import manifest).
- Creates `AGENTS.md` with MCPB usage guidelines.
- Optionally injects instructions into `CLAUDE.md` with `--with-claude`.

### `mcpb add <slug>[@version]`
Downloads a context from the MCPBay marketplace and saves it locally.
- Without a version, resolves and pins the `latest` available version.
- Saves the context JSON to `context_modules/<slug>/<version>.json`.
- Updates `mcp-config.json` with the resolved version.

```sh
mcpb add typescript-expert          # latest
mcpb add typescript-expert@1.2.0   # pinned version
```

### `mcpb start-mcp [-c <config>]`
Starts the MCP server over stdio, loading every context declared in `mcp-config.json`.
This is the command registered in your AI tool's MCP server configuration.

```sh
mcpb start-mcp                      # uses ./mcp-config.json
mcpb start-mcp -c ./custom.json
```

### `mcpb install-mcp <target>`
Automatically registers `mcpb start-mcp` as an MCP server in a supported AI tool.
Currently supported targets:

| Target | Description |
|--------|-------------|
| `claudecode` | Writes the server entry into `~/.claude.json` |

```sh
mcpb install-mcp claudecode
mcpb install-mcp claudecode --mcp-name my-mcpb
```

### `mcpb self-update`
Updates the `mcpb` binary in-place by:
1. Fetching the latest release from GitHub.
2. Downloading the platform-specific binary alongside the current executable as `update`.
3. Swapping the binaries atomically using a three-phase intention handoff (no installer needed).

Supports Windows (`.exe`), macOS (ARM/Intel), and Linux (ARM/Intel).

---

## Tool Execution Engine

When an AI tool calls an MCP tool, `McpServerContext` handles it with these features:

- **Platform filtering** — each tool declares which OS(es) it supports (`windows`, `linux`, `darwin`).
- **Dependency checks** — verifies required executables are present before running.
- **Shell selection** — supports `bash`, `zsh`, `cmd`, and `powershell`.
- **Placeholder interpolation** — `{{cwd}}`, `{{temp}}`, `{{workspace}}`, `{{repo_root}}`, `{{arg.<name>}}`, `{{env.<name>}}` are substituted at call time.
- **Cooldown rate-limiting** — prevents a tool from being called too rapidly.
- **Deterministic caching** — optionally caches results for identical inputs.
- **Output formats** — returns plain text, structured JSON (mapped via output schema), or a file resource link.
- **Success criteria** — validates exit code, stdout regex matches, and output format before returning a result.

---

## Tech Stack

| Concern | Choice |
|---------|--------|
| Runtime | [Deno](https://deno.land) |
| Language | TypeScript |
| CLI framework | [Commander.js](https://github.com/tj/commander.js) |
| MCP server | `@mcpbay/easy-mcp-server` |
| Config format | JSON (`mcp-config.json`) |
| Logging | File-based, rotating daily (`logs/`) |

---

## Project Structure

```
main.ts                          Entry point — CLI definition
src/
  commands/
    init.command.ts              mcpb init
    add.command.ts               mcpb add
    start-mcp.command.ts         mcpb start-mcp
    install-mcp.command.ts       mcpb install-mcp
    self-update.command.ts       mcpb self-update
  classes/
    mcp-server-context.class.ts  Core MCP server implementation
    json-schema-mapper.class.ts  Maps tool JSON output to output schema
    universal-app-checker.class.ts  Checks if CLI tools are installed
  utils/                         Helper utilities (IO, versioning, download…)
  validators/                    JSON schema & format validators
  types/                         Domain types (Tool, Prompt, Resource…)
  constants/                     Path and host constants
context_modules/                 Local context cache (gitignored)
mcp-config.json                  Project import manifest (created by init)
mcpbay-types.ts                  Full MCPBay API type definitions
```

---

## Typical Workflow

```sh
# 1. Install mcpb (see releases on GitHub)

# 2. Initialise your project
mcpb init --with-claude

# 3. Register the MCP server in Claude Code
mcpb install-mcp claudecode

# 4. Browse https://mcpbay.io/marketplace and install a context
mcpb add typescript-expert

# 5. The MCP server auto-starts when Claude Code connects — no further action needed
```

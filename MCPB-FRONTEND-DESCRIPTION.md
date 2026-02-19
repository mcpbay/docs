# MCPBay Frontend — Project Description

## Overview

**MCPBay** is a marketplace platform for AI contexts built on the **Model Context Protocol (MCP)**. It allows developers and teams to create, version, publish, and discover reusable AI contexts — structured bundles of prompts, tools, resources, and environment configuration that can be plugged into AI-powered workflows.

The frontend is a **Next.js 16** single-page application (App Router) serving as the primary interface for managing the full lifecycle of AI contexts: from creation and editing through publishing to a public marketplace and integration via MCP or API tokens.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.5 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 (strict mode) |
| State / Data | Redux Toolkit 2.11 + RTK Query |
| Styling | TailwindCSS 4 |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| Code-gen | `@rtk-query/codegen-openapi` from OpenAPI spec |

---

## Application Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout — Redux provider, global fonts
│   ├── (auth)/                     # Login, Register, Verify pages
│   └── (dashboard)/                # Protected dashboard area
│       ├── layout.tsx              # JWT validation, redirect logic
│       ├── page.tsx                # Home: stats, insights, recommendations
│       ├── contexts/               # Context management pages
│       ├── catalogues/             # Catalogue management pages
│       ├── tokens/                 # API/MCP token management
│       ├── marketplace/            # Public marketplace browser
│       └── components/             # Dashboard-level shared components
├── redux/
│   ├── store.ts                    # Redux store configuration
│   ├── store-provider.component.tsx
│   └── slices/
│       ├── mcpbayApi.ts            # RTK Query API (all endpoints)
│       ├── language.slice.ts       # UI language preference
│       └── theme.slice.ts          # Dark / light theme
└── @core/
    ├── components/                 # Generic reusable UI components
    ├── hooks/                      # Generic hooks (useAsync, etc.)
    └── utils/                      # Helpers (cn, slugIt, token, etc.)
```

---

## Core Domain Concepts

### Contexts

A **Context** is a named, versioned AI artifact owned by a user. It has:

- A **slug** (URL-friendly identifier)
- A **visibility** flag — `PUBLIC` or `PRIVATE`
- One or more **Context Versions**

### Context Versions

Each version is an independently deployable snapshot of the context. Versions carry:

- A **semver** string (e.g., `1.0.0`)
- A **status**: `DRAFT` → `INTERNAL` → `PUBLISHED` → `ARCHIVED`
- Four categories of content, edited through a tabbed interface:

#### 1. Prompts Tab
Define reusable prompt templates that can be invoked by MCP clients.

- Each prompt has an internal name, display title, description, and list of **arguments** (typed variables, required/optional).
- Messages support multiple content types: `TEXT`, `IMAGE`, `AUDIO`, `RESOURCE`, and `WEBHOOK`.
- Text messages support `{{variable}}` interpolation; variables are automatically detected and surfaced as arguments.
- Images can be uploaded and stored as base64 inside the version.

#### 2. Tools Tab
The most complex feature area. Tools are executable functions exposed to AI models through MCP.

Each tool has:
- Internal name, display title, description
- Input and output **JSON schemas**
- Status (`ACTIVE` / `INACTIVE`)
- A unique Tool ID (UUID)
- **Tags** and **invalidation tags** for cache/state management
- One or more **execution strategies**

**Execution Strategy — Local:**
Runs a shell command on the host machine.
- Single command or multi-command sequences
- Target OS: Darwin, Linux, Windows
- Shell: Bash, ZSH, SH, PowerShell, CMD
- Output format: RAW, JSON, CSV, FILE
- Working directory modes: Temp, Workspace, Repo Root, CWD, Project Root
- Timeout and cooldown (ms)
- Required applications/dependencies list
- Permissions: network access, filesystem read, filesystem write, privileged
- Max output size cap
- **Success criteria**: exit code matching and/or regex pattern matching on output
- Output mapping (extract named values from output)
- Deterministic flag

**Execution Strategy — Request (HTTP/Webhook):**
Performs an HTTP call and returns the response as the tool result.
- URL (required)
- Method: GET, POST, PUT, PATCH, DELETE
- Dynamic headers and query parameters (key-value pairs)
- Request body
- Response type: JSON or XML
- Timeout, cooldown, deterministic flag
- Response matching patterns
- Output mapping

Both strategies share **Advanced Options**: priority (0–1), annotations (audience, priority, last modified), response matching regex, and output member extraction.

#### 3. Resources Tab
Attach static data files to the context version. Resources can be referenced from prompts or consumed by tools.

- Supported MIME categories: plain text, Markdown, JSON, CSV, HTML, XML, YAML, and binary blobs
- File size limit: 5 MB
- Stored as base64 within the version record
- Each resource carries a name, description, and MIME type

#### 4. Environment Tab
Declare environment variables required by tool strategies.

- Variable name, description, default value
- `required` flag — whether the variable must be set at runtime
- `modifiableByClient` flag — whether the consumer can override the value

---

## Marketplace

The **Marketplace** is a read-only public directory of `PUBLISHED` context versions.

- Paginated listing (12 per page)
- Full-text search by name, description, and slug
- Detail view showing full context metadata
- Users can add any published version to one of their own **Catalogues**

---

## Catalogues

A **Catalogue** is a named, user-owned collection of context versions sourced from the marketplace. It acts as a curated library for a team or project.

- Status: `ACTIVE` or `INACTIVE`
- Versions can be added or removed at any time
- Multiple contexts from different publishers can coexist in one catalogue

---

## API Tokens

Users can generate two token types:

| Type | Purpose |
|---|---|
| **MCP** | Connect MCP clients (e.g., Claude Desktop) to the user's contexts |
| **API** | Programmatic access to the MCPBay REST API |

Tokens can be created, listed, copied to clipboard, and revoked.

---

## Authentication

1. User registers and optionally verifies their email address.
2. Login returns a **JWT access token** stored in `localStorage`.
3. The dashboard layout validates the token on every navigation; unauthenticated users are redirected to `/login`.
4. The decoded token payload provides user identity and verification status throughout the app.

---

## Internationalisation (i18n)

The app ships a full translation layer covering every user-visible string:

- Navigation, auth flows, form labels, validation messages
- All context/version/tool/strategy configuration fields
- Marketplace, catalogues, tokens
- Currently the primary locale is English; the architecture supports additional languages via the `languageSlice` in Redux.

---

## State Management

All server state is managed by **RTK Query** via a single `mcpbayApi` slice generated from the backend's OpenAPI specification. Tag-based cache invalidation ensures the UI stays consistent after mutations. UI state (theme, language) lives in lightweight Redux slices.

---

## Development

```bash
# Install dependencies
npm install

# Start dev server (port 8081)
npm run dev

# Type-check & lint
npm run lint

# Re-generate API client from OpenAPI spec
npm run codegen

# Production build
npm run build
npm start
```

Environment variable:
- `NEXT_PUBLIC_DISCORD_URL` — Discord community invite link shown in the sidebar.

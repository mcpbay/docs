# First experience

MCPBay, through its CLI, allows the management of contexts for use within
projects.

:::note

`mcpb` is the name of the instrument we utilize to manipulate the contexts we
choose to use on our AI tools.

:::

## Initialize a new project

To start installing and using your contexts, its required to initialize the
default setting of `mcpb`. You can do it automatically running the following
command in your terminal:

```sh
mcpb init
```

:::note

`mcpb init --with-claude` can be used to make Claude Code correctly work with
our mcp.

:::

This will create a file called `mcp-config.json`, and, if doesn't exists,
another one called `AGENTS.md` with the required instructions to make the
contexts work optimally.

## Install a context

To feed your LLM with contexts and new capabilities, you need to install them.
An example to do this is the following command:

```sh
mcpb add typescript-best-practices@latest
```

Once finished, it will download and place the whole context inside the folder
`context_modules` if it wasn't modified on the configuration file.

## Use installed contexts

The wire between installed contexts and your favourite AI tool is the MCPBay MCP
Server. It must be connected. Because every AI tool is unique, we'll explain the
automatic and manual installation of MCPBay MCP Server.

### Automatic installation of MCPBay MCP Server

#### Automatic installation on ClaudeCode

To automatically connect the MCP to ClaudeCode you must run the following
command on your terminal:

```sh
mcpb install-mcp claudecode
```

After this you can start using Claude Code as normal and it will have access to
installed contexts.

#### Manual installation

MCPBay MCP is easily installable to any AI tool that supports MCPs.

Commonly, to install your MCP to an AI tool by yourself is needed to modify some
`.json` file. For [Claude Code](https://code.claude.com/docs/en/mcp), depending
of the scope, you may need to update the `mcpServers` member inside of the
`.claude.json` or, `.mcp.json` file.

:::note

The name of the MCP (`mcpb`) can be changed without problems.

:::

```json tab={"label":"Claude Code"}
{
  "mcpServers": {
    "mcpb": {
      "command": "mcpb",
      "args": ["start-mcp"]
    }
  }
}
```

```json tab={"label":"OpenCode"}
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "mcpbay": {
      "type": "local",
      "command": ["mcpb", "start-mcp"],
      "environment": {},
      "enabled": true
    }
  }
}
```

```json tab={"label":"Cursor"}
{
  "mcpServers": {
    "mcpb": {
      "command": "mcpb",
      "args": ["start-mcp"]
    }
  }
}
```

Once installed you can start using the installed contexts.

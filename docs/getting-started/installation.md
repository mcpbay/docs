---
sidebar_position: 2
---

# Installation

MCPBay CLI works on MacOS, Linux, and Windows. `mcpb` is a single binary executable. It has no external dependencies. On macOS, both M1 (arm64) and Intel (x64) executables are provided. On Linux and Windows, only x64 is supported.

## Download and install

MCPBay provides convenience scripts to download and install the binary.

```sh tab={"label":"Windows (PowerShell)"}
irm https://github.com/mcpbay/mcpb/releases/download/v1.1.1/install.ps1 | iex
```

```sh tab={"label":"Linux"}
curl -fsSL https://github.com/mcpbay/mcpb/releases/download/v1.1.1/install.sh | sh
```

```sh tab={"label":"MacOS"}
curl -fsSL https://github.com/mcpbay/mcpb/releases/download/v1.1.1/install.sh | sh
```

MCPBay binaries can also be installed manually, by downloading the appropiate binary from the [release section of our Github repository](https://github.com/mcpbay/mcpb/releases).

## Source code

The MCPBay CLI is open source, public and free to use under the MIT license, that includes the whole framework we created to handle the MCP protocol.

You can access to it checking the [mcpb repository](https://github.com/mcpbay/mcpb).
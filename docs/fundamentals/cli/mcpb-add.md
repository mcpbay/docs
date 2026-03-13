---
sidebar_position: 2
---

import ConfigOption from './_config-option.mdx';

# mcpb add

Install a new context.

## Syntax

```sh
mcpb add [options] <slug>
```

## Arguments

### options

<ConfigOption/>

#### -f, --force

Forces installation, does not matters if the context already exists on disk or the new context is outdated.

#### --silent

Do not print any information on terminal. 

### slug

The slug identifier of the context to install.

#### Examples

```sh tab={"label":"Latest"}
mcpb add messi-biography
```

```sh tab={"label":"Version"}
mcpb add mcpbay-full-guide@1.0.3
```
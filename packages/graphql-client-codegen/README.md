# @nexus/graphql-client-codegen

This package provides a configuration for GraphQL Code Generator to generate TypeScript types, client-side code, and MSW handlers from a GraphQL schema.

## Installation

This is a private package and is intended to be used within this monorepo. To use it in another package, add it to `devDependencies` and specify the workspace version:

```json
{
  "devDependencies": {
    "@nexus/graphql-client-codegen": "workspace:*"
  }
}
```

You will also need to install the peer dependencies in the consuming package:

```bash
pnpm add -D @graphql-codegen/cli graphql msw zod
```

## Usage

The primary executable for this package is `nexus-graphql-codegen`, which is a wrapper around the `graphql-codegen` CLI.

To generate code, you can run the `codegen` script:

```bash
pnpm codegen
```

This will use the configuration in this package to generate the necessary files.

### Configuration

The configuration is defined within this package and is not intended to be overridden on a per-package basis. To change the code generation, you will need to modify the source code in this package.

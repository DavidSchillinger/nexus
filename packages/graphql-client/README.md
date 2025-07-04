# @nexus/graphql-client

This package provides pre-configured GraphQL clients for use within the monorepo. It wraps Apollo Client and is set up with an `InMemoryCache` and support for subscriptions via `graphql-ws`.

It exports two functions, `getPublicGraphQlClient()` and `getPrivateGraphQlClient()`, which return singleton instances of the configured Apollo Client for public and private APIs respectively.

## Installation

This is a private package. To use it in another package, add it as a dependency and specify the workspace version:

```json
{
  "dependencies": {
    "@nexus/graphql-client": "workspace:*"
  }
}
```

## Usage

```typescript
import { getPublicGraphQlClient, getPrivateGraphQlClient } from '@nexus/graphql-client';
import { gql } from '@apollo/client'; // Or your preferred gql tag

const publicClient = getPublicGraphQlClient();
const privateClient = getPrivateGraphQlClient();

async function fetchPublicData() {
  const result = await publicClient.query({
    query: gql`
      query {
        countries {
          code
          name
        }
      }
    `,
  });
  console.log(result.data.countries);
}
```

## Configuration

The clients are configured with the following URLs:

-   **Public HTTP & WebSocket URL**: `https://countries.trevorblades.com/`
-   **Private HTTP & WebSocket URL**: `https://countries.trevorblades.com/`

To change these, you must modify the `httpUrl` and `wsUrl` parameters passed to `createGraphQlClient` in `packages/graphql-client/src/index.ts`.

# @nexus/eslint-config

This package provides a shareable ESLint configuration for use across the monorepo. It ensures consistent code style and quality.

## Installation

This is a private package and is intended to be used within this monorepo. To use it in another package, add it to `devDependencies` and specify the workspace version:

```json
{
  "devDependencies": {
    "@nexus/eslint-config": "workspace:*"
  }
}
```

You will also need to install the peer dependencies in the consuming package:

```bash
pnpm add -D eslint typescript-eslint
```

## Usage

To use this configuration, import it into your `eslint.config.js` file:

```javascript
import tseslint from 'typescript-eslint';
import { createConfigs } from '@nexus/eslint-config';

export default tseslint.config(
  createConfigs(),
);
```

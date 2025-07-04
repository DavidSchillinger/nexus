// @ts-check

import tseslint from 'typescript-eslint';
import { createConfigs } from './dist/index.js';

export default tseslint.config(
  createConfigs({ ignores: [] }),
);

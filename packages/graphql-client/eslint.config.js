// @ts-check

import tseslint from 'typescript-eslint';
import { createConfigs } from '@nexus/eslint-config';

export default tseslint.config(
  createConfigs(),
);

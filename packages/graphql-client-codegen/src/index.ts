import { type CodegenConfig } from '@graphql-codegen/cli';
import { addTypenameSelectionDocumentTransform } from '@graphql-codegen/client-preset';

const isMswInstalled = !!await import('msw').catch(() => null);
const isZodInstalled = !!await import('zod').catch(() => null);

const outputDirectory = '__generated__/';
const outputPublicDirectory = `${outputDirectory}public/`;
const outputPrivateDirectory = `${outputDirectory}private/`;

const config: CodegenConfig = {
  generates: {
    ...createOptions('**/*.public.ts', outputPublicDirectory),
    ...createOptions('**/*.private.ts', outputPrivateDirectory),
  },
};

export default config;

function createOptions(
  documents: string,
  directory: string,
): CodegenConfig['generates'] {
  const mocks = !isMswInstalled
    ? {}
    : {
        [`${directory}mocks.ts`]: {
          schema: 'https://countries.trevorblades.com/',
          documents,
          plugins: ['typescript', 'typescript-operations', 'typescript-msw'],
        },
      };

  const validation = !isZodInstalled
    ? {}
    : {
        [`${directory}validation.ts`]: {
          schema: 'https://countries.trevorblades.com/',
          plugins: ['typescript-validation-schema'],
          config: {
            schema: 'zod',
            importFrom: './graphql',
          },
        },
      };

  return {
    [directory]: {
      schema: 'https://countries.trevorblades.com/',
      documents,
      preset: 'client',
      config: {
        scalars: { ID: 'string | number' },
        strictScalars: true,
        defaultScalarType: 'unknown',
        onlyOperationTypes: true,
        arrayInputCoercion: false,
      },
      presetConfig: {
        persistedDocuments: {
          hashAlgorithm: 'sha256',
        },
      },
      documentTransforms: [
        addTypenameSelectionDocumentTransform,
      ],
    },
    ...mocks,
    ...validation,
    [`${directory}introspection.json`]: {
      schema: 'https://countries.trevorblades.com/',
      plugins: ['fragment-matcher'],
    },
    [`${directory}schema.graphql`]: {
      schema: 'https://countries.trevorblades.com/',
      plugins: ['schema-ast', {
        add: {
          placement: 'prepend',
          content: `# Generated at: ${new Date().toISOString()}\n`,
        },
      }],
      config: {
        federation: true,
        includeDirectives: true,
        includeIntrospectionTypes: true,
      },
    },
  };
}

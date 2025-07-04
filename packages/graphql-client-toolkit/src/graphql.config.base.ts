export default {
  projects: {
    public: {
      schema: 'https://countries.trevorblades.com/',
      documents: './packages/graphql-client-codegen/tests/**/*.public.ts',
    },
    private: {
      schema: 'https://countries.trevorblades.com/',
      documents: './packages/graphql-client-codegen/tests/**/*.private.ts',
    },
  },
};

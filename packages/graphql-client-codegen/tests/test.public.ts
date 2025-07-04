import { graphql } from '../__generated__/public/gql';

graphql(`
  query getContinents {
    continents {
      name
    }
  }
`);

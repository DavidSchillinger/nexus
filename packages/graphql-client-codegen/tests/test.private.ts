import { graphql } from '../__generated__/private/gql';

graphql(`
  query getContinents {
    continents {
      name
    }
  }
`);

import { ApolloClient, HttpLink, InMemoryCache, type NormalizedCacheObject, split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient as createWsClient } from 'graphql-ws';

let publicClient: ApolloClient<NormalizedCacheObject> | null = null;
export function getPublicGraphQlClient(): ApolloClient<NormalizedCacheObject> {
  if (!publicClient) publicClient = createGraphQlClient({
    httpUrl: 'https://countries.trevorblades.com/',
    wsUrl: 'https://countries.trevorblades.com/',
  });

  return publicClient;
}

let privateClient: ApolloClient<NormalizedCacheObject> | null = null;
export function getPrivateGraphQlClient(): ApolloClient<NormalizedCacheObject> {
  if (!privateClient) privateClient = createGraphQlClient({
    httpUrl: 'https://countries.trevorblades.com/',
    wsUrl: 'https://countries.trevorblades.com/',
  });

  return privateClient;
}

interface GraphQlClientOptions {
  httpUrl: string;
  wsUrl: string;
}

function createGraphQlClient(options: GraphQlClientOptions): ApolloClient<NormalizedCacheObject> {
  const { httpUrl, wsUrl } = options;

  const httpLink = new HttpLink(
    { uri: httpUrl },
  );

  const wsLink = new GraphQLWsLink(
    createWsClient({ url: wsUrl }),
  );

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition'
        && definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { FC } from 'react';

const client = new ApolloClient({
  uri: 'https://fakerql.nplan.io/graphql',
  cache: new InMemoryCache(),
});

const ApolloClientProvider: FC<{}> = props => (
  <ApolloProvider client={client}>{props.children}</ApolloProvider>
);

export default ApolloClientProvider;

import * as React from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import * as API from '../constants/api'
import AppRoute from './AppRoute';

const client = new ApolloClient({
  uri: API.GraphQLAPI,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppRoute />
    </ApolloProvider>
  );
}
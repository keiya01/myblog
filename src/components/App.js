import * as React from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import * as API from '../constants/api'
import AppRoute from './AppRoute';
import { GET_USER } from "../graphql/user";
import { CurrentUser } from "../contexts/user";

const { useState, useEffect } = React;

const client = new ApolloClient({
  uri: API.GraphQLAPI,
});


const useFetchCurrentUser = () => {
  const [user, setUser] = useState({});

  const fetchCurrentUser = async () => {

    const public_id = localStorage.getItem('id');

    if (!public_id) {
      return
    };

    const { data: { user } } = await client.query({
      query: GET_USER,
      variables: { public_id },
    });

    setUser(user);

  }

  useEffect(() => {
    fetchCurrentUser();
  })

  return [user, setUser]

}

export default function App() {
  const [user, setUser] = useFetchCurrentUser();

  const state = {
    user,
    setUser
  }

  return (
    <CurrentUser.Provider value={state}>
      <ApolloProvider client={client}>
        <AppRoute />
      </ApolloProvider>
    </CurrentUser.Provider>
  );
}
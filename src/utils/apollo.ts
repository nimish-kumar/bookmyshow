import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_API_URL } from "@env";

export const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});

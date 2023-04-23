import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GRAPHQL_API_URL } from "@env";

import { getAccessToken } from "./authentication";

const httpLink = new HttpLink({ uri: GRAPHQL_API_URL });
const withToken = setContext(async () => {
  const accessToken = await getAccessToken();
  return { accessToken };
});
const authMiddleware = new ApolloLink((operation, forward) => {
  const { accessToken } = operation.getContext();
  operation.setContext(({ headers = {} }) => {
    const newHeaders = {
      headers: {
        ...headers,
        Authorization: accessToken ? `JWT ${accessToken}` : null,
      },
    };
    console.log("URI ---->", GRAPHQL_API_URL);
    console.log("Headers --->", newHeaders);
    return newHeaders;
  });
  return forward(operation);
});
const responseLogMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    console.log("Response error ---> ", response.errors);
    console.log("Response data ---> ", response.data);
    return response;
  });
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([withToken, authMiddleware, responseLogMiddleware, httpLink]),
});

import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GRAPHQL_API_URL } from "@env";

import { getAccessToken, hasTokenExpired } from "./authentication";
import { googleSignInSilently } from "./firebase";

const httpLink = new HttpLink({ uri: GRAPHQL_API_URL });
const withToken = setContext(async () => {
  let accessToken = await getAccessToken();
  if (accessToken && hasTokenExpired(accessToken)) {
    const { user } = await googleSignInSilently();
    if (user) {
      accessToken = await user.getIdToken();
    }
  }
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
    
    return newHeaders;
  });
  return forward(operation);
});
const responseLogMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    return response;
  });
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([withToken, authMiddleware, responseLogMiddleware, httpLink]),
});

import { TypedDocumentNode, gql } from "@apollo/client";
import {
  MutationRefreshTokenArgs,
  MutationTokenAuthArgs,
  ObtainJsonWebToken,
  Refresh,
} from "src/__generated__/graphql";

export const FETCH_ACCESS_TOKEN: TypedDocumentNode<
  ObtainJsonWebToken,
  MutationTokenAuthArgs
> = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      payload
      refreshExpiresIn
      token
    }
  }
`;

export const REFRESH_TOKEN: TypedDocumentNode<
  Refresh,
  MutationRefreshTokenArgs
> = gql`
  mutation refreshToken($token: String!) {
    refreshToken(token: $token) {
      payload
      refreshExpiresIn
      token
    }
  }
`;

import { TypedDocumentNode, gql } from "@apollo/client";
import { IAccessTokenData, IRefreshTokenData } from "@types";
import {
  MutationRefreshTokenArgs,
  MutationTokenAuthArgs,
} from "src/__generated__/graphql";

export const FETCH_ACCESS_TOKEN: TypedDocumentNode<
  IAccessTokenData,
  MutationTokenAuthArgs
> = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      payload
      refreshExpiresIn
      token
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN: TypedDocumentNode<
  IRefreshTokenData,
  MutationRefreshTokenArgs
> = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      payload
      refreshExpiresIn
      token
      refreshToken
    }
  }
`;

import { gql } from "src/__generated__/gql";

export const FETCH_TOKEN = gql(`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      payload
      refreshExpiresIn
      token
    }
  }
`);

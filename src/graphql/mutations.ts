import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Mutation($createUserInput: CreateUserInput!) {
    register(createUserInput: $createUserInput) {
      email
      id
      userName
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      refreshToken
      user {
        email
        id
        userName
        isEmailVerified
        profile {
          avatar
        }
      }
    }
  }
`;

export const GOOGLE_SIGNIN_MUTATION = gql`
  mutation LoginWithGoogle($accessToken: String!) {
    loginWithGoogle(accessToken: $accessToken) {
      accessToken
      refreshToken
      user {
        email
        id
        isEmailVerified
        userName
        profile {
          avatar
        }
      }
    }
  }
`;

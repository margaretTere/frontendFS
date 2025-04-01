import {gql} from 'apollo-angular'

export const SIGNUP = gql`
    mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;

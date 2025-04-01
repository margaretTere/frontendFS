import {gql} from 'apollo-angular'

export const LOGIN = gql`
  query login($emailOrUsername: String!, $password: String!) {
      login(emailOrUsername: $emailOrUsername, password: $password)
    }
`;

import { gql } from '@apollo/client';
import { REPO_FRAGMENT } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      edges {
        node {
          ...RepoFragment
        }
      }
    }
  }
  ${REPO_FRAGMENT}
`;

export const GET_ME = gql`
  {
    me {
      id
      username
    }
  }
`;

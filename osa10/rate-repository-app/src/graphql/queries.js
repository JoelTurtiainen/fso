import { gql } from '@apollo/client';
import {
  REPO_FRAGMENT,
  REPO_LINK_FRAGMENT,
  REVIEW_FRAGMENT,
} from './fragments';

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

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepoFragment
      fullName
      url
    }
  }
  ${REPO_FRAGMENT}
`;

export const GET_REPOSITORY_REVIEWS = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      ...ReviewFragment
    }
  }
  ${REVIEW_FRAGMENT}
`;

export const GET_ME = gql`
  {
    me {
      id
      username
    }
  }
`;

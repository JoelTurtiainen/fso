import { gql } from '@apollo/client';
import { REPO_FRAGMENT, REVIEW_FRAGMENT } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $after: String
    $first: Int
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      after: $after
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepoFragment
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
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

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            repository {
              fullName
              id
            }
            id
            text
            rating
            createdAt
          }
        }
      }
    }
  }
`;

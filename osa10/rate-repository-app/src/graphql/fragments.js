import { gql } from '@apollo/client';

export const REPO_FRAGMENT = gql`
  fragment RepoFragment on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
  }
`;
export const REVIEW_CONNECTION_FRAGMENT = gql`
  fragment ReviewConnectionFragment on ReviewConnection {
    edges {
      node {
        id
        text
        rating
        createdAt
        repositoryId
        user {
          id
          username
        }
      }
      cursor
    }
  }
`;

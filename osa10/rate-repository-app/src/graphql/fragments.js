import { gql } from '@apollo/client';

export const REPO_FRAGMENT = gql`
  fragment RepoFragment on Repository {
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

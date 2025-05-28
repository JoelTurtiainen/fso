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

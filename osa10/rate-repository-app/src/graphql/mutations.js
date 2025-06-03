import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      text
      rating
      createdAt
      user {
        id
        username
      }
    }
  }
`;

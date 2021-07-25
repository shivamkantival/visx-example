import { gql, useQuery } from '@apollo/client';
import { QueryResult } from '@apollo/client/react/types/types';
import { Post } from 'typeDefs/posts';

type AllPostsResult = { allPosts: Array<Post> };

interface FetchAllPostsVariables {
  count: number;
}

const GET_ALL_POSTS = gql`
  query FetchAllPosts($count: Int!) {
    allPosts(count: $count) {
      id
      title
      published
      createdAt
      likelyTopics {
        label
        likelihood
      }
      author {
        id
        firstName
        lastName
        email
        avatar
      }
    }
  }
`;

export function useFetchAllPosts(
  variables: FetchAllPostsVariables
): QueryResult<AllPostsResult> {
  return useQuery<AllPostsResult, FetchAllPostsVariables>(GET_ALL_POSTS, {
    variables,
  });
}

import {
  compact,
  castArray,
  flow,
  filter,
  head,
  map,
  flatten,
  uniqBy,
  maxBy,
} from 'lodash';
import { Post } from 'typeDefs/posts';
import { Topic } from 'typeDefs/topics';
import { getTopicLabel } from './topics';

export function getNumericCreatedAtEpoch(post: Post): number {
  return parseInt(post.createdAt, 10);
}

export function getRelevantTopics(post: Post): Array<Topic> {
  return flow(
    post => compact(castArray(post.likelyTopics)),
    (allLikelyTopics: Array<Topic>) => {
      const filteredLikelyTopics = filter(
        allLikelyTopics,
        topic => topic.likelihood > 0.15
      );

      return filteredLikelyTopics.length
        ? filteredLikelyTopics
        : compact([head(allLikelyTopics)]);
    }
  )(post);
}

export function getUniqueTopicsFromPosts(posts: Array<Post>): Array<Topic> {
  return flow(
    posts => map(posts, getRelevantTopics),
    flatten,
    allTopics => uniqBy(allTopics, getTopicLabel)
  )(posts);
}

export function getMaxCreatedAtAcrossPosts(posts: Array<Post>): number {
  return getNumericCreatedAtEpoch(
    maxBy(posts, getNumericCreatedAtEpoch) as NonNullable<Post>
  );
}

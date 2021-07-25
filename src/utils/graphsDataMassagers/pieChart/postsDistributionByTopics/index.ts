import { PieChartDataInterface } from 'components/graphsLibrary/PieChart/typeDefs';
import { flatten, flow, groupBy, map, reduce } from 'lodash';
import { Post } from 'typeDefs/posts';
import { Topic } from 'typeDefs/topics';
import { getRelevantTopics } from 'utils/entityReaders/posts';
import { getTopicLabel } from 'utils/entityReaders/topics';

function mapPostsToTopics(allPosts: Array<Post>): Array<Topic> {
  return flow(posts => map(posts, getRelevantTopics), flatten)(allPosts);
}

function mapTopicsToFrequencyMap(
  allTopics: Array<Topic>
): Record<string, number> {
  return flow(
    topics => groupBy(topics, getTopicLabel),
    topicLabelsToTopicsMap =>
      reduce(
        topicLabelsToTopicsMap,
        (acc, topics, topicLabel) => ({ ...acc, [topicLabel]: topics.length }),
        {}
      )
  )(allTopics);
}

function mapTopicToFrequencyMapToPieChartData(
  topicLabelToFrequencyMap: Record<string, number>
): Array<PieChartDataInterface> {
  return reduce<Record<string, number>, Array<PieChartDataInterface>>(
    topicLabelToFrequencyMap,
    (acc, frequecy, topicLabel) =>
      acc.concat({
        label: topicLabel,
        value: frequecy,
      }),
    []
  );
}

export default function parsePostsAsTopicDistributionData(
  posts: Array<Post>
): Array<PieChartDataInterface> {
  return flow(
    mapPostsToTopics,
    mapTopicsToFrequencyMap,
    mapTopicToFrequencyMapToPieChartData
  )(posts);
}

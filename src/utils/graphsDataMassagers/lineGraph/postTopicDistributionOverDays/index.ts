import { Post } from "typeDefs/posts";
import { LineGraphSingularData } from "components/graphsLibrary/LineGraph/typeDefs";
import { flatten, flow, groupBy, map, reduce } from "lodash";
import {
  getMaxCreatedAtAcrossPosts,
  getNumericCreatedAtEpoch,
  getRelevantTopics,
  getUniqueTopicsFromPosts,
} from "utils/entityReaders/posts";
import { initArrayWithEpochForNDaysInPast } from "utils/dateTime";
import dayjs from "dayjs";
import { Topic } from "typeDefs/topics";

function mapPostsToTopicFrequencyMap(
  posts: Array<Post>
): Record<string, number> {
  return flow(
    (posts) => map(posts, getRelevantTopics),
    flatten,
    (topics) => map(topics, (topic) => topic.label),
    groupBy,
    (topicLabelToInstancesArray) =>
      reduce(
        topicLabelToInstancesArray,
        (acc, instances, topicLabel) => ({
          ...acc,
          [topicLabel]: instances.length,
        }),
        {}
      )
  )(posts);
}

function getEpochToTopicsFrequencyMap(
  posts: Array<Post>
): Record<string, Record<string, number>> {
  return flow(
    (posts) =>
      groupBy(posts, (post) =>
        dayjs(getNumericCreatedAtEpoch(post)).startOf("d").valueOf()
      ),
    (epochByPostsMap) =>
      reduce(
        epochByPostsMap,
        (acc, posts, epoch) => ({
          ...acc,
          [epoch]: mapPostsToTopicFrequencyMap(posts),
        }),
        {}
      )
  )(posts);
}

function createLinearGraphDataForTopicOverEpochRange(
  topic: Topic,
  epochsToFillDataFor: Array<number>,
  epochToTopicsFrequencyMap: Record<string, Record<string, number>>
): LineGraphSingularData {
  return {
    key: topic.label,
    data: map(epochsToFillDataFor, (epoch) => {
      const topicsFrequenciesMap = epochToTopicsFrequencyMap[epoch] ?? {};
      return {
        domain: dayjs(epoch).format("DD/MM/YY"),
        value: topicsFrequenciesMap[topic.label] ?? 0,
      };
    }),
  };
}

export default function postTopicDistributionOverDays(
  posts: Array<Post>,
  params: { numberOfDaysToCover?: number }
): Array<LineGraphSingularData> {
  const { numberOfDaysToCover = 30 } = params;
  const endEpoch = getMaxCreatedAtAcrossPosts(posts);
  const allEpochsToEvaluate = initArrayWithEpochForNDaysInPast(
    endEpoch,
    numberOfDaysToCover
  );
  const epochToTopicsFrequencyMap = getEpochToTopicsFrequencyMap(posts);
  const allUniqueTopics = getUniqueTopicsFromPosts(posts);

  return reduce<Topic, Array<LineGraphSingularData>>(
    allUniqueTopics,
    (acc, topic) =>
      acc.concat(
        createLinearGraphDataForTopicOverEpochRange(
          topic,
          allEpochsToEvaluate,
          epochToTopicsFrequencyMap
        )
      ),
    []
  );
}

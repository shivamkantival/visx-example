import { FC, useMemo } from "react";
import { Post } from "typeDefs/posts";
import useStyle from "./styles";
import LineGraph from "components/graphsLibrary/LineGraph";
import { getDistributionDataForLineGraphByDay } from "utils/graphsDataMassagers/lineGraph/frequencyLineGraphByDay";
import {
  getMaxCreatedAtAcrossPosts,
  getNumericCreatedAtEpoch,
} from "utils/entityReaders/posts";
import { Typography } from "@material-ui/core";

const PostsPerDayDistribution: FC<{ posts: Array<Post> }> = ({ posts }) => {
  const { postsPerDayContainer, lineGraphContainer } = useStyle();

  const lineGraphData = useMemo(
    () =>
      getDistributionDataForLineGraphByDay<Post>(posts, {
        numberOfDaysToCover: 30,
        epochGetter: getNumericCreatedAtEpoch,
        endDateEpoch: getMaxCreatedAtAcrossPosts(posts),
        key: "All Posts",
      }),
    [posts]
  );

  return (
    <div className={postsPerDayContainer}>
      <LineGraph
        className={lineGraphContainer}
        data={lineGraphData}
        uniqueKey={"all-posts-distribution-by-day"}
      />
      <Typography variant="subtitle1">
        {"Trend for number of posts per day"}
      </Typography>
    </div>
  );
};

export default PostsPerDayDistribution;

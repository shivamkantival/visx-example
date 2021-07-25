import { FC, useMemo } from "react";
import { Post } from "typeDefs/posts";
import { User } from "typeDefs/users";
import parsePostsAsTopicDistributionData from "utils/graphsDataMassagers/pieChart/postsDistributionByTopics";
import useStyle from "./styles";
import PieChart from "components/graphsLibrary/PieChart";
import { getUserId, getUserName } from "utils/entityReaders/users";
import { Typography } from "@material-ui/core";

const TopicDistributionInsights: FC<{
  posts: Array<Post>;
  author: User;
  className?: string;
}> = ({ posts, author, className }) => {
  const dataForPieChart = useMemo(
    () => parsePostsAsTopicDistributionData(posts),
    [posts]
  );

  const { topicDistributionInsightsContainer, pieChartContainer, noteText } =
    useStyle();

  return (
    <div className={`${topicDistributionInsightsContainer} ${className}`}>
      <PieChart
        className={pieChartContainer}
        data={dataForPieChart}
        uniqueKey={getUserId(author)}
      />
      <Typography variant={"subtitle1"}>{`${getUserName(
        author
      )}'s topic distribution`}</Typography>
      <Typography variant={"subtitle2"} className={noteText}>
        Note: Click on user heatmap below to see his/her details<sup>*</sup>
      </Typography>
    </div>
  );
};

export default TopicDistributionInsights;

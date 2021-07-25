import { FC, useMemo } from "react";
import { Post } from "typeDefs/posts";
import useStyle from "./styles";
import {
  getMaxCreatedAtAcrossPosts,
  getNumericCreatedAtEpoch,
} from "utils/entityReaders/posts";
import { Typography } from "@material-ui/core";
import { createWeaklyHeatmapData } from "utils/graphsDataMassagers/heatmap/weeklyHeatmap";
import Heatmap from "components/graphsLibrary/Heatmap";

const PerDayPostsHeatmap: FC<{ posts: Array<Post> }> = ({ posts }) => {
  const { perDayPostsHeatmapContainer, heatmapContainer } = useStyle();

  const heatmapData = useMemo(
    () =>
      createWeaklyHeatmapData(posts, {
        numberOfDaysToPrepareDataFor: 90,
        dataGetter: getNumericCreatedAtEpoch,
        endDateEpoch: getMaxCreatedAtAcrossPosts(posts),
      }),
    [posts]
  );

  return (
    <div className={perDayPostsHeatmapContainer}>
      <Heatmap
        className={heatmapContainer}
        data={heatmapData}
        uniqueKey={"posts-per-day-insights"}
      />
      <Typography variant="subtitle1">
        {"Heatmap of posts per day over last 3 months"}
      </Typography>
    </div>
  );
};

export default PerDayPostsHeatmap;

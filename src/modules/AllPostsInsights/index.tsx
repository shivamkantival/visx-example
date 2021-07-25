import { FC, ReactElement, useCallback } from "react";
import { useFetchAllPosts } from "hooks/dataFetchers/posts";
import { Divider, Paper, Typography } from "@material-ui/core";
import SpinLoader from "components/atoms/SpinLoader";
import ErrorState, { ERROR_TYPES } from "components/atoms/ErrorState";
import useStyle from "./styles";
import PostsPerDayDistribution from "modules/AllPostsInsights/components/PostsPerDayDistribution";
import PerDayPostsHeatmap from "modules/AllPostsInsights/components/PerDayPostsHeatmap";

const STATIC_LARGE_POSTS_COUNT = 1000;

const AllPostsInsights: FC<{}> = () => {
  const { error, loading, data } = useFetchAllPosts({
    count: STATIC_LARGE_POSTS_COUNT,
  });

  const {
    contentContainer,
    insightsContainer,
    allPostsInsightsContainer,
    pageHeader,
  } = useStyle();

  const renderData = useCallback<() => ReactElement>(() => {
    const allPosts = data?.allPosts ?? [];

    return allPosts.length ? (
      <div className={insightsContainer}>
        <PerDayPostsHeatmap posts={allPosts} />
        <Divider />
        <PostsPerDayDistribution posts={allPosts} />
      </div>
    ) : (
      <ErrorState code={ERROR_TYPES.NO_CONTENT} />
    );
  }, [data?.allPosts, insightsContainer]);

  const loadedDataRenderer = useCallback<() => ReactElement>(
    () =>
      error ? <ErrorState code={ERROR_TYPES.CLIENT_ERROR} /> : renderData(),
    [error, renderData]
  );

  return (
    <Paper className={allPostsInsightsContainer}>
      <Typography variant="h4" className={pageHeader}>
        All Posts Insights
      </Typography>
      <div className={contentContainer}>
        {loading ? <SpinLoader /> : loadedDataRenderer()}
      </div>
    </Paper>
  );
};

export default AllPostsInsights;

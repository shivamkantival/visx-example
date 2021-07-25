import { FC, ReactElement, useCallback } from "react";
import { useFetchAllPosts } from "hooks/dataFetchers/posts";
import { Paper, Typography } from "@material-ui/core";
import ErrorState, { ERROR_TYPES } from "components/atoms/ErrorState";
import SpinLoader from "components/atoms/SpinLoader";
import useStyle from "./style";
import AuthorsList from "./components/AuthorsList";

const LARGE_STATIC_POSTS_COUNT = 1000;

const Authors: FC<{}> = () => {
  const { data, error, loading } = useFetchAllPosts({
    count: LARGE_STATIC_POSTS_COUNT,
  });

  const { authorsPageContainer, pageHeader, contentContainer } = useStyle();

  const renderData = useCallback<() => ReactElement>(() => {
    const allPosts = data?.allPosts ?? [];

    return allPosts.length ? (
      <AuthorsList posts={allPosts} />
    ) : (
      <ErrorState code={ERROR_TYPES.NO_CONTENT} />
    );
  }, [data?.allPosts]);

  const loadedDataRenderer = useCallback<() => ReactElement>(
    () =>
      error ? <ErrorState code={ERROR_TYPES.CLIENT_ERROR} /> : renderData(),
    [error, renderData]
  );

  return (
    <Paper className={authorsPageContainer}>
      <Typography variant="h4" className={pageHeader}>
        Authors
      </Typography>
      <div className={contentContainer}>
        {loading ? <SpinLoader /> : loadedDataRenderer()}
      </div>
    </Paper>
  );
};

export default Authors;

import { flow, groupBy, map } from "lodash";
import { FC, useMemo, useState } from "react";
import { Post } from "typeDefs/posts";
import { getAuthor } from "utils/entityReaders/posts";
import { getUserId } from "utils/entityReaders/users";
import useStyle from "./styles";
import { getAuthorFromPosts } from "modules/Authors/components/AuthorsList/utils";
import AuthorDetails from "./components/AuthorDetails";
import TopicDistributionInsights from "modules/Authors/components/AuthorsList/components/TopicDistributionInsights";

const AuthorsList: FC<{ posts: Array<Post> }> = ({ posts }) => {
  const postsByAuthorId = useMemo<Record<string, Array<Post>>>(
    () => groupBy(posts, flow(getAuthor, getUserId)),
    [posts]
  );

  const {
    allAuthorsWithDitributionContainer,
    listContainer,
    topicDistributionInsightsContainer,
  } = useStyle();

  const [selectedAuthorId, setSelectedAuthor] = useState<string>(
    getUserId(getAuthorFromPosts(posts))
  );

  return (
    <div className={allAuthorsWithDitributionContainer}>
      <TopicDistributionInsights
        posts={postsByAuthorId[selectedAuthorId]}
        author={getAuthorFromPosts(postsByAuthorId[selectedAuthorId])}
        className={topicDistributionInsightsContainer}
      />
      <div className={listContainer}>
        {map(postsByAuthorId, (authorSpecificPosts) => {
          const author = getAuthorFromPosts(authorSpecificPosts);
          return (
            <AuthorDetails
              key={getUserId(author)}
              author={author}
              posts={authorSpecificPosts}
              onSelectAuthor={setSelectedAuthor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AuthorsList;

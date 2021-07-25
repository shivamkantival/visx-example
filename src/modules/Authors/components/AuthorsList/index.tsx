import { flow, groupBy, map } from "lodash";
import { FC, useMemo, useState } from "react";
import { Post } from "typeDefs/posts";
import { getAuthor } from "utils/entityReaders/posts";
import { getUserId } from "utils/entityReaders/users";
import useStyle from "./styles";
import { getAuthorFromPosts } from "modules/Authors/components/AuthorsList/utils";
import AuthorDetails from "../AuthorDetails";

const AuthorsList: FC<{ posts: Array<Post> }> = ({ posts }) => {
  const postsByAuthorId = useMemo<Record<string, Array<Post>>>(
    () => groupBy(posts, flow(getAuthor, getUserId)),
    [posts]
  );

  const { authorsListContainer } = useStyle();

  const [selectedAuthorId, setSelectedAuthor] = useState<string>(
    getUserId(getAuthorFromPosts(posts))
  );

  return (
    <div className={authorsListContainer}>
      {map(postsByAuthorId, (authorSpecificPosts) => {
        const author = getAuthorFromPosts(authorSpecificPosts);
        return (
          <AuthorDetails
            key={getUserId(author)}
            author={author}
            posts={authorSpecificPosts}
          />
        );
      })}
    </div>
  );
};

export default AuthorsList;

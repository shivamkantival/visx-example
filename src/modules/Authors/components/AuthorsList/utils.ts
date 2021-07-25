import { flow, head } from "lodash";
import { Post } from "typeDefs/posts";
import { User } from "typeDefs/users";
import { getAuthor } from "utils/entityReaders/posts";

export const getAuthorFromPosts: (posts: Array<Post>) => User = flow(
  head,
  getAuthor
);

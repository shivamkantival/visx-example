import { Topic } from './topics';
import { User } from './users';

export interface Post {
  id: string;
  title: string;
  body: string;
  published: boolean;
  createdAt: string;
  author: User;
  likelyTopics: Array<Topic>;
}

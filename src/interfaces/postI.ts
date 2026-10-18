import type { CommentI } from "./comment";
import type { PostUserI } from "./postUserI";

export interface PostI {
  _id: string;
  id: string;
  body?: string;
  image?: string;
  privacy: string;
  user: PostUserI;
  sharedPost: PostI | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: CommentI | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  bookmarked: boolean;
}

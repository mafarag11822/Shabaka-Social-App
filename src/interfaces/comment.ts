import type { PostUserI } from "./postUserI";

export interface CommentI {
  _id: string;
  content: string;
  commentCreator: PostUserI;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
  likesCount: number;
  isReply: boolean;
  id: string;
}

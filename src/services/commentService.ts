import axios from "axios";
import { baseUrl } from "../APIs/apis";
import type {
  CreateCommentResponse,
  DeleteCommentResponse,
  GetPostCommentsResponse,
  UpdateCommentResponse,
} from "../types/response";

class CommentService {
  async createComment(
    postId: string,
    formData: FormData,
  ): Promise<CreateCommentResponse> {
    const { data } = await axios.post(
      `${baseUrl}/posts/${postId}/comments`,
      formData,
      {
        headers: { token: localStorage.getItem("token") },
      },
    );
    return data;
  }
  async deleteComment(
    postId: string,
    commentId: string,
  ): Promise<DeleteCommentResponse> {
    const { data } = await axios.delete(
      `${baseUrl}/posts/${postId}/comments/${commentId}`,
      {
        headers: { token: localStorage.getItem("token") },
      },
    );
    return data;
  }
  async updateComment(
    postId: string,
    commentId: string,
    formData: FormData,
  ): Promise<UpdateCommentResponse> {
    const { data } = await axios.put(
      `${baseUrl}/posts/${postId}/comments/${commentId}`,
      formData,
      {
        headers: { token: localStorage.getItem("token") },
      },
    );
    return data;
  }
  async getPostComments(postId: string): Promise<GetPostCommentsResponse> {
    const { data } = await axios.get(
      "https://route-posts.routemisr.com/posts/" + postId + "/comments",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );

    return data;
  }
}
const commentService = new CommentService();
export default commentService;

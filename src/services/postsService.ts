import axios from "axios";
import {
  allPostsUrl,
  baseUrl,
  createPostsUrl,
  DeletePostsUrl,
} from "../APIs/apis";
import type { GetPostResponse, GetPostsResponse } from "../types/response";

class PostsServices {
  //====== Method to get All Post ============================>
  async getAllPost(): Promise<GetPostsResponse> {
    const { data } = await axios.get(allPostsUrl, {
      headers: { token: localStorage.getItem("token") },
    });
    return data;
  }
  //====== Method to create Post ============================>
  async createPost(formData: FormData) {
    const { data } = await axios.post(createPostsUrl, formData, {
      headers: { token: localStorage.getItem("token") },
    });

    return data;
  }
  //====== Method to delete Post ============================>
  async deletePost(postId: string) {
    const { data } = await axios.delete(DeletePostsUrl + postId, {
      headers: { token: localStorage.getItem("token") },
    });

    return data;
  }
  //====== Method to get Post Details ============================>
  async getPostDetails(postId: string): Promise<GetPostResponse> {
    const { data } = await axios.get(`${baseUrl}/posts/${postId}`, {
      headers: { token: localStorage.getItem("token") },
    });

    return data;
  }
}
const postsServices = new PostsServices();
export default postsServices;

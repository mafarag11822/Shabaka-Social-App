import { addToast } from "@heroui/toast";
import type { PostI } from "../../../interfaces/postI";
import PostCard from "./PostCard";
import commentService from "../../../services/commentService";
import postsServices from "../../../services/postsService";
export default function AllPosts({
  posts,
  getAllPosts,
}: {
  posts: PostI[];
  getAllPosts: () => Promise<void>;
}) {
  //===== function for delete post ==============>
  async function deletePost(postId: string) {
    try {
      const response = await postsServices.deletePost(postId);
      addToast({
        title: "Post deleted",
        description: response.message,
        color: "success",
      });
      await getAllPosts();
    } catch (error: any) {
      addToast({
        title: "Failed to delete post",
        description: error.response?.data?.message ?? "Something went wrong",
        color: "danger",
      });
    }
  }
  //===== function for create comment ==============>
  async function createComment(postId: string, formData: FormData) {
    try {
      const response = await commentService.createComment(postId, formData);
      await getAllPosts();
      return response;
    } catch (error: any) {
      addToast({
        title: "Failed to create comment",
        description: error.response?.data?.message ?? "Something went wrong",
        color: "danger",
      });
    }
  }
  //===== function for upadte comment ==============>
  async function updateComment(
    postId: string,
    commentId: string,
    formData: FormData,
  ) {
    try {
      const response = await commentService.updateComment(
        postId,
        commentId,
        formData,
      );
      await getAllPosts();
      return response;
    } catch (error: any) {
      addToast({
        title: "Failed to Update comment",
        description: error.response?.data?.message ?? "Something went wrong",
        color: "danger",
      });
    }
  }
  //===== function for delete comment ==============>
  async function deleteComment(postId: string, commentId: string) {
    try {
      const response = await commentService.deleteComment(postId, commentId);
      await getAllPosts();
      return response;
    } catch (error: any) {
      addToast({
        title: "Failed to delete comment",
        description: error.response?.data?.message ?? "Something went wrong",
        color: "danger",
      });
    }
  }
  if (posts.length === 0)
    return (
      <p className="overflow-visible rounded-xl py-15 text-center text-slate-400 border border-slate-200 bg-white shadow-sm">
        No posts yet. Be the first one to publish.
      </p>
    );
  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          deletePost={deletePost}
          deleteComment={deleteComment}
          createComment={createComment}
          updateComment={updateComment}
        />
      ))}
    </div>
  );
}

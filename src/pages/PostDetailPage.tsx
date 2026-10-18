import { useParams } from "react-router-dom";
import postsServices from "../services/postsService";
import { useEffect, useState } from "react";
import type { PostI } from "../interfaces/postI";
import { addToast, Spinner } from "@heroui/react";
import PostCard from "../features/posts/components/PostCard";
import commentService from "../services/commentService";
import type { CommentI } from "../interfaces/comment";

export default function PostDetailPage() {
  const { postId = "" } = useParams();
  const [post, setPost] = useState<PostI>();
  const [comments, setComments] = useState<CommentI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //===== function for get Post Details ==============>
  async function getPostDetails() {
    try {
      const response = await postsServices.getPostDetails(postId);
      setPost(response.data.post);
      await getPostComments()
    } finally {
      setIsLoading(false);
    }
  }
  //===== function for get Post Comments ==============>
  async function getPostComments() {
    const response = await commentService.getPostComments(postId);
    setComments(response.data.comments);
  }
  //===== use Effect ==============>

  useEffect(() => {
    getPostDetails();
  }, []);
  //===== function for delete post ==============>
  async function deletePost(postId: string) {
    try {
      const response = await postsServices.deletePost(postId);
      addToast({
        title: "Post deleted",
        description: response.message,
        color: "success",
      });
      await getPostDetails();
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
      await getPostDetails();
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
      await getPostDetails();
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
      await getPostDetails();
      return response;
    } catch (error: any) {
      addToast({
        title: "Failed to delete comment",
        description: error.response?.data?.message ?? "Something went wrong",
        color: "danger",
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <Spinner size="lg" variant="wave" />
      </div>
    );
  }
  return (
    <>
      <div className="w-full mt-3 ">
        <PostCard
          key={post!._id}
          post={post}
          deletePost={deletePost}
          deleteComment={deleteComment}
          createComment={createComment}
          updateComment={updateComment}
          comments={comments}
        />
      </div>
    </>
  );
}

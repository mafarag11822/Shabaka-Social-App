import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from "@heroui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaArrowsRotate, FaBookmark, FaPen } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineGlobe } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline, IoTrashBin } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { PostI } from "../../../interfaces/postI";
import { useState, useContext } from "react";
import { authContext } from "../../../context/authContext";
import { formatDistanceToNow } from "date-fns";
import CreateComment from "./comment/CreateComment";
import type {
  CreateCommentResponse,
  DeleteCommentResponse,
} from "../../../types/response";
import type { CommentI } from "../../../interfaces/comment";
import Comment from "./comment/Comment";
export default function PostCard({
  post,
  comments,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
}: {
  post: PostI | undefined;
  comments?: CommentI[];
  deletePost: (postId: string) => Promise<void>;
  createComment: (
    postId: string,
    formData: FormData,
  ) => Promise<CreateCommentResponse | undefined>;
  updateComment: (
    postId: string,
    commentId: string,
    formData: FormData,
  ) => Promise<CreateCommentResponse | undefined>;
  deleteComment: (
    postId: string,
    commentId: string,
  ) => Promise<DeleteCommentResponse | undefined>;
}) {
  const { userData } = useContext(authContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const isOwner = post!.user._id === userData?.id;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isPostDetails = pathname.startsWith("/posts/");
  //===== function to handle confirm delete =================>
  async function handleConfirmDelete() {
    setIsDeleting(true);
    try {
      await deletePost(post!._id);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  }
  if (!post) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <Spinner size="lg" variant="wave" />
      </div>
    );
  }
  return (
    <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Start of post Header */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Link
            className="shrink-0"
            to={`/profile/${post.user._id}`}
            data-discover="true"
          >
            <img
              alt={post.user.name}
              className="h-11 w-11 rounded-full object-cover"
              src={post.user.photo}
            />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1 text-sm">
              <Link
                className="font-extrabold text-foreground hover:underline"
                to={`/profile/${post.user._id}`}
                data-discover="true"
              >
                {post.user.name}
              </Link>
              {post.body === "updated profile picture." ? (
                <span className="text-[12px] font-medium text-slate-500">
                  updated profile picture.
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              <time
                dateTime={post.createdAt}
                title={new Date(post.createdAt).toLocaleString()}
                className="text-xs font-sans font-semibold text-slate-500"
              >
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </time>
              <span className="text-slate-500">·</span>
              <span className="inline-flex items-center gap-1 font-sans font-bold text-slate-500">
                <HiOutlineGlobe />
                {post.privacy}
              </span>
            </div>
          </div>
          <div>
            {/* Start of Delete & Edit & Save Buttons */}

            <Dropdown>
              <DropdownTrigger>
                <Button
                  aria-label="Post options"
                  isIconOnly
                  variant="light"
                  size="sm"
                  radius="full"
                  className="text-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                >
                  <BsThreeDots />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Post Actions">
                {[
                  <DropdownItem key="save" startContent={<FaBookmark />}>
                    Save Post
                  </DropdownItem>,

                  ...(isOwner
                    ? [
                        <DropdownItem key="edit" startContent={<FaPen />}>
                          Edit Post
                        </DropdownItem>,
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          startContent={<IoTrashBin />}
                          onPress={onOpen}
                        >
                          Delete Post
                        </DropdownItem>,
                      ]
                    : []),
                ]}
              </DropdownMenu>
            </Dropdown>

            {/* End of Delete & Edit Buttons */}
          </div>
        </div>
      </div>
      {/* End of post Header */}

      {/* Start of post Content */}
      <div>
        {/* Post Body*/}
        {post.body && post.body !== "updated profile picture." && (
          <p
            dir="auto"
            className="px-4 pb-3 text-sm whitespace-pre-wrap wrap-break-word"
          >
            {post.body}
          </p>
        )}

        {/* Post Image */}
        {post.image && (
          <div className="max-h-155 overflow-hidden border-y border-slate-200">
            <button
              type="button"
              className="group relative block w-full cursor-zoom-in"
            >
              <img
                src={post.image}
                alt="post"
                className="w-full object-cover"
              />
              <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
            </button>
          </div>
        )}
      </div>
      {/* End of post Content */}

      {/* Start of post Reacts */}
      <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
              <AiFillLike />
            </span>
            <button
              type="button"
              className="font-semibold transition cursor-default"
            >
              {post.likesCount} {post.likesCount > 1 ? "likes" : "like"}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <FaArrowsRotate />
              {post.sharesCount} {post.sharesCount > 1 ? "shares" : "share"}
            </span>
            <span>
              {post.commentsCount}{" "}
              {post.commentsCount > 1 ? "comments" : "comment"}
            </span>
            <button
              type="button"
              onClick={() => navigate(`/posts/${post._id}`)}
              className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]"
            >
              View details
            </button>
          </div>
        </div>
      </div>
      {/* End of post Reacts */}

      <div className="mx-4 border-t border-slate-200" />

      {/* Start of Action Buttons */}
      <div className="grid grid-cols-3 gap-1 p-1">
        <button
          type="button"
          className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"
        >
          <AiOutlineLike className="text-[18px]" />
          <span>Like</span>
        </button>
        <button
          onClick={() => setIsCommentOpen((prev) => !prev)}
          disabled={isPostDetails}
          className={`cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm hover:bg-slate-100 ${
            isCommentOpen ? "text-[#1877f2]" : "text-slate-600"
          }`}
        >
          <IoChatbubbleEllipsesOutline className="text-[18px]" />
          <span>Comment</span>
        </button>
        <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
          <FiShare2 className="text-[18px]" />
          <span>Share</span>
        </button>
      </div>
      {/* End of Action Buttons */}

      <div className="mx-4 border-t border-slate-200" />

      {/* Start of Create Comments */}
      {(isCommentOpen || comments) && (
        <CreateComment
          post={post}
          createComment={createComment}
          setIsCommentOpen={setIsCommentOpen}
        />
      )}
      {/* End of Create Comments */}

      {/* Start of top comment */}

      {comments ? (
        <div
          className={
            (comments?.length ?? 0) > 0
              ? "m-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col gap-3"
              : undefined
          }
        >
          {" "}
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              deleteComment={deleteComment}
              updateComment={updateComment}
            />
          ))}
        </div>
      ) : (
        post.topComment && (
          <div className="m-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
              Top Comment
            </p>
            <Comment
              comment={post.topComment}
              updateComment={updateComment}
              deleteComment={deleteComment}
            />
          </div>
        )
      )}
      {/* End of top comment */}

      {/* Delete Model */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>Delete post?</ModalHeader>
          <ModalBody>
            <p className="text-sm text-slate-600">
              This action can't be undone. The post will be permanently removed.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose} isDisabled={isDeleting}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleConfirmDelete}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Delete Model */}
    </article>
  );
}

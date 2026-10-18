import { formatDistanceToNow } from "date-fns";
import type { CommentI } from "../../../../interfaces/comment";
import { useContext, useRef, useState } from "react";
import { authContext } from "../../../../context/authContext";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { BsThreeDots } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";
import { FaPen, FaXmark } from "react-icons/fa6";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import EmojiButton from "../emoji/EmojiButton";
import type {
  CreateCommentResponse,
  DeleteCommentResponse,
} from "../../../../types/response";

export default function Comment({
  comment,
  updateComment,
  deleteComment,
}: {
  comment: CommentI;
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
  const [inEditMode, setInEditMode] = useState(false);

  const [commentContent, setCommentContent] = useState(comment.content);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  //===== function to handle confirm delete ===================================>
  async function handleConfirmDelete() {
    setIsDeleting(true);
    try {
      await deleteComment(comment.post, comment._id);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  }
  //========> Function to handle Image <===============//
  function handleImgChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImgPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
  //========> Function to remove image <===============//
  function removeImg() {
    setImgPreview(null);
    setImgFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
  //========> Function to handle Update comment <===============//
  async function handleUpdateComment(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (commentContent.trim()) formData.set("content", commentContent);
      if (imgFile) formData.set("image", imgFile);
      await updateComment(comment.post, comment._id, formData);
      setCommentContent("");
      setImgFile(null);
      setInEditMode(false);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <div className="flex items-start gap-2">
        <img
          alt={comment.commentCreator.name}
          className="h-8 w-8 rounded-full object-cover"
          src={comment.commentCreator.photo}
        />
        <div
          className={`min-w-0 ${inEditMode ? "w-full" : "w-fit"} rounded-2xl bg-white px-3 py-2`}
        >
          <div className="flex justify-between items-start gap-3">
            <div className="">
              <p className="truncate text-xs font-bold text-slate-900">
                {comment.commentCreator.name}
              </p>
              <p className="truncate text-xs font-medium text-slate-500 font-sans">
                {`@${comment.commentCreator.username} | `}
                <time
                  dateTime={comment.createdAt}
                  title={new Date(comment.createdAt).toLocaleString()}
                  className="text-xs font-sans font-semibold text-slate-500"
                >
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </time>
              </p>
            </div>
            {comment.commentCreator?._id === userData?.id && (
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
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    onPress={() => setInEditMode(true)}
                    key="edit"
                    startContent={<FaPen />}
                  >
                    Edit file
                  </DropdownItem>
                  <DropdownItem
                    onPress={onOpen}
                    key="delete"
                    className="text-danger"
                    color="danger"
                    startContent={<IoTrashBin />}
                  >
                    Delete file
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
          {inEditMode ? (
            <div
              className="w-full my-2 rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white"
              data-comment-mention-root="true"
            >
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder={`Comment as ${userData?.name}...`}
                rows={1}
                className="max-h-35 min-h-10 w-full resize-none bg-transparent px-2 py-1.5 text-xs leading-5 outline-none placeholder:text-slate-500"
              />
              {imgPreview && (
                <div className="relative w-80 mb-3">
                  <img
                    alt="Preview"
                    className="max-h-60 w-full rounded-lg object-cover"
                    src={imgPreview}
                  />
                  <button
                    aria-label="Remove image"
                    type="button"
                    onClick={removeImg}
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white backdrop-blur-sm"
                  >
                    <FaXmark />
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <label className="flex cursor-pointer items-center rounded-lg px-1 py-1 font-semibold text-slate-500 transition hover:bg-slate-200">
                    <MdOutlineAddPhotoAlternate className="text-2xl" />
                    <input
                      ref={fileInputRef}
                      onChange={handleImgChange}
                      accept="image/*"
                      className="hidden"
                      type="file"
                    />
                  </label>
                  <EmojiButton
                    onSelect={(emoji) => setCommentContent((t) => t + emoji)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      (setInEditMode(false),
                        setCommentContent(comment.content));
                    }}
                    className="inline-flex p-0.5 items-center justify-center rounded-full border-2 border-slate-500 text-slate-500 shadow-sm transition hover:bg-slate-200 cursor-pointer"
                  >
                    {isLoading ? (
                      <Spinner
                        color="default"
                        label="Default"
                        labelColor="foreground"
                      />
                    ) : (
                      <FaXmark />
                    )}
                  </button>
                  <button
                    onClick={handleUpdateComment}
                    className="inline-flex p-2 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100 "
                    disabled={(!commentContent.trim() && !imgFile) || isLoading}
                  >
                    {isLoading ? (
                      <Spinner
                        color="default"
                        label="Default"
                        labelColor="foreground"
                      />
                    ) : (
                      <FaPen />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p
              dir="auto"
              className="mt-2 whitespace-pre-wrap text-sm text-slate-700"
            >
              {comment.content}
            </p>
          )}
        </div>
      </div>
      {/* Delete Model */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>Delete comment?</ModalHeader>
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
    </div>
  );
}

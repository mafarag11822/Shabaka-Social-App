import { useContext, useRef, useState } from "react";
import { BiLogoTelegram } from "react-icons/bi";
import { authContext } from "../../../../context/authContext";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import EmojiButton from "../emoji/EmojiButton";
import { FaXmark } from "react-icons/fa6";
import type { PostI } from "../../../../interfaces/postI";
import { Spinner } from "@heroui/react";
import type { CreateCommentResponse } from "../../../../types/response";
export default function CreateComment({
  post,
  createComment,
  setIsCommentOpen
}: {
  post: PostI;
  createComment: (postId: string, formData: FormData)=> Promise<CreateCommentResponse | undefined>;
  setIsCommentOpen:any
}) {
  const { userData } = useContext(authContext);
  const [commentContent, setCommentContent] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

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
  //========> Function to handle Create comment <===============//
  async function handleCreateComment() {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (commentContent.trim()) formData.set("content", commentContent);
      if (imgFile) formData.set("image", imgFile);
      await createComment(post._id, formData);
      setCommentContent("");
      setIsCommentOpen(false)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-3 p-3">
      <div className="flex items-start gap-2">
        <img
          alt={userData?.name}
          className="h-9 w-9 rounded-full object-cover"
          src={userData?.photo}
        />
        <div
          className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white"
          data-comment-mention-root="true"
        >
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder={`Comment as ${userData?.name}...`}
            rows={1}
            className="max-h-35 min-h-10 w-full resize-none bg-transparent px-2 py-1.5 text-xs leading-5 outline-none placeholder:text-slate-500"
            defaultValue={""}
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
            <button
              onClick={handleCreateComment}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100 "
              disabled={(!commentContent.trim() && !imgFile) || isLoading}
            >
              {isLoading ? (
                <Spinner
                  color="default"
                  label="Default"
                  labelColor="foreground"
                />
              ) : (
                <BiLogoTelegram />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

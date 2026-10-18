import { addToast, Button } from "@heroui/react";
import { FaXmark } from "react-icons/fa6";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BiLogoTelegram } from "react-icons/bi";
import { useContext, useRef, useState } from "react";
import { HiOutlineGlobe } from "react-icons/hi";
import { authContext } from "../../../context/authContext";
import postsServices from "../../../services/postsService";
import EmojiButton from "./emoji/EmojiButton";
//==============================================================>
export default function CreatePost({
  getAllPosts,
}: {
  getAllPosts: () => Promise<void>;
}) {
  const { userData } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  //========> Function to cansel post's form <===============//
  function cancel() {
    setCaption("");
    removeImg();
    setShowForm(false);
  }

  //========> Function to create post <===============//
  async function createPost(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (caption.trim()) formData.set("body", caption);
      if (imgFile) formData.set("image", imgFile);
      const data = await postsServices.createPost(formData);
      addToast({
        title: "Post created",
        description: data.message,
        color: "success",
      });
      setCaption("");
      removeImg();
      setShowForm(false);
      await getAllPosts();
    } catch (error: any) {
      addToast({
        title: "Failed to create post",
        description: error.response?.data?.message ?? "Something went wrong",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {showForm ? (
        <>
          {/* Header of creat post form */}
          <div className="flex items-start justify-between">
            <div className="mb-3 flex items-start gap-3">
              <img
                alt={userData?.name}
                className="h-11 w-11 rounded-full object-cover"
                src={userData?.photo}
              />
              <div className="flex-1">
                <p className="text-base font-extrabold text-slate-900">
                  {userData?.name}
                </p>
                <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                  <HiOutlineGlobe />
                  <select className="bg-transparent outline-none">
                    <option value="public">Public</option>
                    <option value="following">Followers</option>
                    <option value="only_me">Only me</option>
                  </select>
                </div>
              </div>
            </div>
            <Button
              type="button"
              isIconOnly
              variant="light"
              size="sm"
              aria-label="Cancel"
              onPress={cancel}
              className="rounded-md text-lg text-slate-500"
            >
              <FaXmark />
            </Button>
          </div>
          {/* End of Header of create post form */}

          <form onSubmit={createPost}>
            <div className="relative">
              <textarea
                rows={3}
                placeholder={`Hi${userData?.name ?? ""}, What's on your mind?`}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white resize-none"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            {imgPreview && (
              <div className="relative mt-2">
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

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-300 pt-3">
              <div className="relative flex items-center gap-1">
                <label className="flex cursor-pointer items-center rounded-lg px-1 py-1 font-semibold text-slate-500 transition hover:bg-slate-100">
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
                  onSelect={(emoji) => setCaption((t) => t + emoji)}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={(!caption.trim() && !imgFile) || isLoading}
                  className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60"
                >
                  {isLoading ? "Posting..." : "Post"}
                  <BiLogoTelegram />
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <img
            alt={userData?.name}
            className="h-11 w-11 rounded-full object-cover"
            src={userData?.photo}
          />
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full cursor-pointer text-left text-xs text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg px-4 py-3 transition duration-200"
          >
            {`Hi ${userData?.name ?? ""}, What's on your mind?`}
          </button>
        </div>
      )}
    </div>
  );
}

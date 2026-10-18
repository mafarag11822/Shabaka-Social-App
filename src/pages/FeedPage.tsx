import { useEffect, useState } from "react";
import { Tab, Tabs } from "@heroui/react";
import { FaRegFileImage } from "react-icons/fa6";
import { HiOutlineGlobe } from "react-icons/hi";
import { IoBookmarkOutline } from "react-icons/io5";
import AllPosts from "../features/posts/components/AllPosts";
import CreatePost from "../features/posts/components/CreatePost";
import postsServices from "../services/postsService";
import type { PostI } from "../interfaces/postI";
//======================================================================>
export default function FeedPage() {
  const [selected, setSelected] = useState<string>("community");
  const [posts, setPosts] = useState<PostI[]>([]);
  //===== function to get all Posts ================>
  async function getAllPosts() {
    try {
      const response = await postsServices.getAllPost();
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);
  //============================================================>
  return (
    <>
      <div>
        <div className="grid grid-cols-12 gap-4 mt-2 relative">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3 order-1 lg:self-start lg:sticky lg:top-21.75 lg:block">
            <div>
              <Tabs
                className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                classNames={{
                  tab: "justify-start",
                  tabList: "bg-white",
                  cursor: "bg-[#E7F3FF] shadow-none",
                  tabContent:
                    "text-slate-700 group-data-[selected=true]:text-[#1877f2] ",
                }}
                fullWidth
                size="md"
                aria-label="Options"
                isVertical
                selectedKey={selected}
                onSelectionChange={(key) => setSelected(String(key))}
              >
                <Tab
                  key="community"
                  title={
                    <div className="flex items-center space-x-1">
                      <HiOutlineGlobe className="text-xl" />
                      <span>Community</span>
                    </div>
                  }
                />
                <Tab
                  key="my_posts"
                  title={
                    <div className="flex items-center space-x-1">
                      <FaRegFileImage className="text-xl" />
                      <span>My Posts</span>
                    </div>
                  }
                />
                <Tab
                  key="saved_posts"
                  title={
                    <div className="flex items-center space-x-1">
                      <IoBookmarkOutline className="text-xl" />
                      <span>Saved</span>
                    </div>
                  }
                />
              </Tabs>
            </div>
          </div>
          {/* Create Posts & Posts */}
          <div className="col-span-12 lg:col-span-6 order-3 md:order-2">
            <CreatePost getAllPosts={getAllPosts} />
            <div className="mt-4 w-full">
              {selected === "community" && (
                <AllPosts posts={posts} getAllPosts={getAllPosts} />
              )}
              {selected === "my_posts"}
              {selected === "saved_posts"}
            </div>
          </div>
          {/* Search & Suggested Friends */}
          <div className="col-span-12 lg:col-span-3  order-2 md:order-3 lg:self-start lg:sticky lg:top-21.75 lg:block">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"></div>
          </div>
        </div>
      </div>
    </>
  );
}

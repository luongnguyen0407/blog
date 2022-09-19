import PageNotFound from "./PageNotFound ";
import Heading from "../components/Heading";
import Author from "../components/dashboard/Author";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import "../pages/Dashboard/Post.scss";
const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postDetail, setPostDetail] = useState({});
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() &&
            setPostDetail({
              id: doc.id,
              ...doc.data(),
            });
        });
      });
    }
    fetchData();
  }, [slug]);
  if (!slug) return <PageNotFound />;
  if (!postDetail.title) return <PageNotFound />;
  return (
    <div className="p-24">
      <div>
        <div className="container">
          <div className="flex justify-between items-center gap-10 mb-10">
            <img
              src={postDetail.imgUrl}
              className="w-full max-w-[550px] h-[400px] rounded-3xl object-cover"
            />
            <div className="flex-1 post-info">
              <div className="mb-6">Kiến thức</div>
              <Heading className="font-bold">{postDetail.title}</Heading>
              <div></div>
            </div>
          </div>
          <div className="post-content">
            <div
              className="entry-content"
              dangerouslySetInnerHTML={{
                __html: postDetail.detailPost || "",
              }}
            ></div>
            <div className="author mt-10 mb-20 flex rounded-3xl bg-blue-200 items-center p-4 gap-x-4">
              <Author author={postDetail.useCreatePost} />
            </div>
          </div>
          <div className="post-related">
            <Heading>Bài viết liên quan</Heading>
            <div className="grid-layout grid-layout--primary"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;

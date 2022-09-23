import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/auth-context";
import { db } from "../../firebase-app/firebase-config";
import ActionDelete from "./iconAction/ActionDelete";
import ActionUpdate from "./iconAction/ActionUpdate";
import ActionView from "./iconAction/ActionView";
import Slug from "./Slug";

const PostManage = () => {
  const [posts, setPost] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const { userInfor } = useAuth();
  console.log(userInfor);

  useEffect(() => {
    const colRef = collection(db, "posts");
    console.log(filter);
    const newRef = filter
      ? query(
          colRef,
          where("title", ">=", filter),
          where("title", "<=", filter + "utf8")
        )
      : query(colRef, where("useCreatePost.id", "==", userInfor?.uid || "h"));
    onSnapshot(newRef, (snapshot) => {
      let resPost = [];
      snapshot.forEach((doc) => {
        resPost.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPost(resPost);
    });
  }, [filter, userInfor]);
  const handleDeletePost = async (post, urlImg) => {
    if (!post.id) return;
    if (!(userInfor.uid === post.useCreatePost.id)) {
      toast.error("Bạn không có quyền thực hiệu thao tác này");
      return;
    }
    const imageRegex = /%2F(\S+)\?/gm.exec(urlImg);
    const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
    const colRef = doc(db, "posts", post.id);
    Swal.fire({
      title: "Bạn muốn xóa bài viết này ?",
      text: "Thao tác này sẽ khiến bài viết bị xóa vĩnh viễn ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        handleDeleteImgDatabase(imageName);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const handleDeleteImgDatabase = async (nameImg) => {
    if (nameImg) {
      const storage = getStorage();
      const desertRef = ref(storage, "images/" + nameImg);
      deleteObject(desertRef)
        .then(() => console.log("delete done"))
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const searchHandler = debounce((e) => {
    const query =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setFilter(query);
  }, 500);
  return (
    <div className="p-4">
      <div className="flex gap-3">
        <Link
          to={"/dashboard/post/addPost"}
          className="p-3 bg-green-300 rounded-lg my-4 text-white"
        >
          Add New Post
        </Link>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 outline-none"
          onChange={searchHandler}
        />
      </div>
      <div className=" lg:w-full mt-4 overflow-x-auto">
        <table className="w-full tableCategory table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.length <= 0 && (
              <div className="font-semibold text-xl text-blue-300 mt-4">
                Bạn chưa có bài viết nào
              </div>
            )}
            {posts.length > 0 &&
              posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id.slice(0, 5) + "..."}</td>
                  <td title={post.title}>{post.title.slice(0, 20) + "..."}</td>
                  <td className="text-sm italic font-light text-gray-300">
                    {post.useCreatePost.name}
                  </td>
                  <td>
                    <Slug status={+post.status}></Slug>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <Link to={`/post/${post.slug}`}>
                        <ActionView />
                      </Link>
                      <ActionUpdate
                        onClick={() =>
                          navigate(`/dashboard/post/updatepost?id=${post.id}`)
                        }
                      />
                      <ActionDelete
                        onClick={() => handleDeletePost(post, post.imgUrl)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostManage;

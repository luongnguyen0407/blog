import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import Slug from "./Slug";
import ActionUpdate from "./iconAction/ActionUpdate";
import ActionDelete from "./iconAction/ActionDelete";
import ActionView from "./iconAction/ActionView";
import { debounce } from "lodash";
import Swal from "sweetalert2";
const Category = () => {
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "category");
    const newRef = filter
      ? query(
          colRef,
          where("name", ">=", filter),
          where("name", "<=", filter + "utf8")
        )
      : colRef;
    onSnapshot(newRef, (snapshot) => {
      let resCategory = [];
      snapshot.forEach((doc) => {
        resCategory.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategory(resCategory);
    });
  }, [filter]);
  const handleDeleteCategory = async (categoryId) => {
    if (!categoryId) return;
    const colRef = doc(db, "category", categoryId);
    Swal.fire({
      title: "Bạn muốn xóa tag này ?",
      text: "Thao tác này sẽ khiến các bài viết gắn tag này thành tag 'Đời sống' ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
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
          to={"/dashboard/category/addcategory"}
          className="p-3 bg-green-300 rounded-lg my-4 text-white"
        >
          Thêm Category
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
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {category.length > 0 &&
              category.map((ca) => (
                <tr key={ca.id}>
                  <td>{ca.id}</td>
                  <td>{ca.name}</td>
                  <td className="text-sm italic font-light text-gray-300">
                    {ca.slug}
                  </td>
                  <td>
                    <Slug status={Number(ca.status)}></Slug>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <ActionView />
                      <ActionUpdate
                        onClick={() =>
                          navigate(
                            `/dashboard/category/updatecategory?id=${ca.id}`
                          )
                        }
                      />
                      <ActionDelete
                        onClick={() => handleDeleteCategory(ca.id)}
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

export default Category;

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/auth-context";
import { db } from "../../firebase-app/firebase-config";
import ActionDelete from "./iconAction/ActionDelete";
import ActionUpdate from "./iconAction/ActionUpdate";
import Slug from "./Slug";
const Category = () => {
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const { userInfor } = useAuth();
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
  ///////
  const handleDeleteCategory = async (categoryId) => {
    if (!categoryId) return;
    if (userInfor.uid !== "OAJZZNGcxTWaSPCNJzMfk1crVkC3") {
      toast.error("Bạn không có quyền thực hiệu thao tác này");
      return;
    }
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
  //////
  const handleUpdateCategory = (id) => {
    if (!id) return;
    if (userInfor.uid !== "OAJZZNGcxTWaSPCNJzMfk1crVkC3") {
      toast.error("Bạn không có quyền thực hiệu thao tác này");
      return;
    }
    navigate(`/dashboard/category/updatecategory?id=${id}`);
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
                      <ActionUpdate
                        onClick={() => handleUpdateCategory(ca.id)}
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

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import Slug from "./Slug";
import ActionUpdate from "./iconAction/ActionUpdate";
import ActionDelete from "./iconAction/ActionDelete";
import ActionView from "./iconAction/ActionView";
import Swal from "sweetalert2";
const Category = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "category");
    onSnapshot(colRef, (snapshot) => {
      let resCategory = [];
      snapshot.forEach((doc) => {
        resCategory.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategory(resCategory);
    });
  }, []);
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
  return (
    <div className="p-4">
      <Link
        to={"/dashboard/category/addcategory"}
        className="p-3 bg-green-300 rounded-lg my-4 text-white"
      >
        Thêm Category
      </Link>
      <div className="table w-full mt-4">
        <table className="w-full tableCategory">
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

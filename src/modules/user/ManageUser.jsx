import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../../firebase-app/firebase-config";
import { roleUser, statusUser } from "../../utils/Const";
import ActionDelete from "../category/iconAction/ActionDelete";
import ActionUpdate from "../category/iconAction/ActionUpdate";

const ManageUser = () => {
  const [listUser, setListUser] = useState();
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const arrUser = [];
      snapshot.forEach((doc) => {
        arrUser.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setListUser(arrUser);
    });
  }, []);
  const renderRoleLabel = (role) => {
    switch (role) {
      case roleUser.Admin:
        return "Admin";
      case roleUser.Mod:
        return "Moderator";
      case roleUser.User:
        return "User";
      default:
        break;
    }
  };
  const renderStatusLabel = (status) => {
    switch (status) {
      case statusUser.Active:
        return (
          <div className="p-2 bg-green-100 text-green-500 text-center rounded-lg">
            Active
          </div>
        );
      case statusUser.Pending:
        return (
          <div className="p-2 bg-blue-100 text-blue-500 text-center rounded-lg">
            Pending
          </div>
        );
      case statusUser.Ban:
        return (
          <div className="p-2 bg-red-100 text-red-500 text-center rounded-lg">
            Ban
          </div>
        );
      default:
        break;
    }
  };
  if (!listUser) return;
  const handleDeleteUser = async (user) => {
    if (!user) return;
    const colRef = doc(db, "users", user.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
      <div className="flex gap-3">
        <Link
          to={"/dashboard/user/useraddnew"}
          className="p-3 bg-green-300 rounded-lg my-4 text-white"
        >
          Thêm User
        </Link>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 outline-none"
        />
      </div>
      <div className="table w-full mt-4">
        <table className="w-full tableCategory">
          <thead>
            <tr>
              <th>Id</th>
              <th>Info</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listUser.length > 0 &&
              listUser.map((user) => (
                <tr key={user.id}>
                  <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
                  <td>
                    <div className="flex gap-x-4 items-center">
                      <img
                        className="w-[40px] h-[40px] rounded-sm"
                        src={user.avatar}
                        alt=""
                      />
                      <div>
                        <p>{user.username}</p>
                        <p className="text-sm text-gray-300">
                          {new Date(
                            user?.createAt?.seconds * 1000
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm italic font-light text-gray-300">
                    {user.email}
                  </td>
                  <td>{renderStatusLabel(user.status)}</td>
                  <td>{renderRoleLabel(user.role)}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <ActionUpdate />
                      <ActionDelete onClick={() => handleDeleteUser(user)} />
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

export default ManageUser;

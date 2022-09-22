import { collection, getDocs, limit, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-app/firebase-config";
import CartCol from "./CartCol";
import CartRow from "./CartRow";

const Newest = () => {
  const [newest, setNewest] = useState([]);
  useEffect(() => {
    const resNew = [];
    const getData = async () => {
      const cateRef = collection(db, "posts");
      const q = query(
        cateRef,
        where("status", "==", 1),
        where("hot", "==", false),
        limit(4)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        resNew.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setNewest(resNew);
    };
    getData();
  }, []);
  if (newest.length <= 0) return null;
  const [first, ...other] = newest;
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <CartCol data={first}></CartCol>
      <div className="p-6 bg-purple-100 rounded-lg flex flex-col justify-around">
        {other.length > 0 &&
          other.map((item) => (
            <CartRow
              post={item}
              key={item.id}
              tag="Kiến thức"
              heading="Hướng dẫn setup phòng cực chill dành cho người mới toàn tập"
            ></CartRow>
          ))}
      </div>
    </div>
  );
};

export default Newest;

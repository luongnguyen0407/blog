import { collection, getDocs, limit, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-app/firebase-config";
import CardFeature from "./CartFeature";

const Feature = () => {
  const [postHot, setPostHot] = useState();
  useEffect(() => {
    const resPost = [];
    const getData = async () => {
      const cateRef = collection(db, "posts");
      const q = query(
        cateRef,
        where("status", "==", 1),
        where("hot", "==", true),
        limit(3)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        resPost.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostHot(resPost);
    };
    getData();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4">
      {!postHot && <div>loading</div>}
      {postHot &&
        postHot.map((post) => (
          <CardFeature key={post.id} data={post}></CardFeature>
        ))}
    </div>
  );
};

export default Feature;

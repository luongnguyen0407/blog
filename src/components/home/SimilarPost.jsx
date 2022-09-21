import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase-app/firebase-config";
import CartCol from "./CartCol";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const SimilarPost = () => {
  const [similarPost, setSimilarPost] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");

    onSnapshot(colRef, (snapshot) => {
      let resPost = [];
      snapshot.forEach((doc) => {
        resPost.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setSimilarPost(resPost);
    });
  }, []);
  if (similarPost.length <= 0) return null;
  return (
    <div className="mt-10">
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {similarPost.map((item) => (
          <SwiperSlide key={item.id}>
            <CartCol data={item} className="text-lg"></CartCol>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarPost;

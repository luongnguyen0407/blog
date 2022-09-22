import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase-app/firebase-config";
import CartCol from "./CartCol";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../../pages/Dashboard/Post.scss";
import { Navigation } from "swiper";
import "swiper/css/navigation";
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
    <div className="mt-10 similarSlider">
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        modules={[Navigation]}
        loop={true}
        navigation
        breakpoints={{
          // when window width is >= 640px
          1440: {
            slidesPerView: 5,
          },
          970: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          720: {
            slidesPerView: 2,
          },
        }}
      >
        {similarPost.map((item) => (
          <SwiperSlide key={item.id}>
            <CartCol
              fixHeight="max-h-[200px]"
              data={item}
              className="text-lg"
            ></CartCol>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarPost;

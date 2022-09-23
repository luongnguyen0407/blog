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
import ErrorFallback from "../Error/ErrorFallback";
import { withErrorBoundary } from "react-error-boundary";
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
        {similarPost.length <= 0 &&
          new Array(3).fill(4).map((i, index) => (
            <SwiperSlide key={index}>
              <CartColSkeleton />
            </SwiperSlide>
          ))}
        {similarPost.length > 0 &&
          similarPost.map((item) => (
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

const CartColSkeleton = () => {
  return (
    <div className="w-full cursor-pointer pb-5 relative min-h-[390px]">
      <div className="w-full rounded-lg overflow-hidden mb-3">
        <div className="w-full object-cover min-h-[200px] skeleton"></div>
      </div>
      <p className="w-16 h-3 skeleton rounded-md my-1"></p>
      <p className="w-full h-3 skeleton"></p>
      <div className="my-2"></div>
      <p className="w-full h-3 skeleton"></p>
      <div className="my-2"></div>
      <p className="w-full h-3 skeleton"></p>
      <p className="w-16 h-3 skeleton rounded-md my-1"></p>
    </div>
  );
};

export default withErrorBoundary(SimilarPost, {
  FallbackComponent: ErrorFallback,
});

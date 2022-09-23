import { collection, getDocs, limit, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { db } from "../../firebase-app/firebase-config";
import CardFeature from "./CartFeature";
import "swiper/css";
import CardSkeleton from "../common/CardSkeleton";

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
    <div className="">
      {}
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        breakpoints={{
          // when window width is >= 640px
          1440: {
            slidesPerView: 4,
          },
          970: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
        }}
      >
        {!postHot && (
          <>
            <SwiperSlide>
              <CardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <CardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <CardSkeleton />
            </SwiperSlide>
          </>
        )}
        {postHot &&
          postHot.map((post) => (
            <SwiperSlide key={post.id}>
              <CardFeature data={post}></CardFeature>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Feature;

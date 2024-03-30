import React from "react";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../App.css";
import IMAGESLIDE from "./ImagesSlide.jsx";
import styled from "styled-components";

SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);
function ImageSlider({ Maxwidth }) {
  let data = [
    "/images/creed1bg.jpg",
    "/images/creed1bg.jpg",
    // "/images/creed1bg.jpg",
    // "/images/creed1bg.jpg",
  ];

  return (
    <DIV>
      <Swiper
        style={{ maxWidth: "100vw", scrollX: "hidden" }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        grabCursor={false}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        className="mySwiper"
      >
        {/* using array */}
        {data.map((ele, index) => {
          return (
            <SwiperSlide key={index}>
              <IMAGESLIDE src={ele} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </DIV>
  );
}

export default ImageSlider;

const DIV = styled.div`
  height: 85vh;
  @media (max-width: 400px) {
    width: 400px;
    padding-top: 0px;
  }
`;
const Headers = styled.div`
  // padding: 80px;
  margin: 30px;
  font-size: 40px;
  color: rgb(255, 221, 64);
`;

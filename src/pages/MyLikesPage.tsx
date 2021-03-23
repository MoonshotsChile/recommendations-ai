import React, { useCallback, useContext, useEffect, useState } from "react";
import LikeCard from "../components/my-likes/Card";

import { UserdataUseCase } from "../domain/UserdataUseCase";
import { Userdata } from "../domain/entity/Userdata";
import { clockLike, likeSelected } from "../assets";
import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

SwiperCore.use([Navigation]); //descomentar para habilitar
import "../components/my-likes/Card.scss";
const MyLikesPage: React.FC = () => {
  const useCase = new UserdataUseCase();
  const { rut } = useContext(ContextApi);

  const [likes, setLikes] = useState([]);
  const [laters, setLaters] = useState([]);
  //const [breakpoints, setBreakpoints] = useState({});

  const breakpoints = {
    // when window width is >= 640px
    640: {
      width: 640,
      spaceBetween: 2,
      slidesPerView: 2,
    },
    // when window width is >= 768px
    768: {
      width: 768,
      spaceBetween: 2,
      slidesPerView: 4,
    },
  };
  useEffect(() => {
    useCase
      .find(rut || "")
      .then((response: Response) => response.json())
      .then((data: any) => {
        setLikes(data.likes);
        setLaters(data.later);
      });
  }, []);

  return (
    <div className="my-likes container">
      <Navbar selected={NAVBAR_ACTIONS.likes} />
      <div className="section">
        <div className="columns">
          <div className="column">
            <span className="icon-text">
              <span className="icon">
                <img src={likeSelected} />
              </span>
              <span>Mis likes</span>
            </span>
          </div>
        </div>
        <div className="columns">
          <Swiper
            id="Swiper1"
            slidesPerView={2}
            navigation
            breakpoints={breakpoints}
          >
            {likes.map((like: any, i: number) => {
              return (
                <div
                  id="LikesCard"
                  className="column"
                  key={`LikesCards-000${i.toString()}${Math.random().toString()}`}
                >
                  <SwiperSlide>
                    <LikeCard benefit={like} />
                  </SwiperSlide>
                </div>
              );
            })}
          </Swiper>
        </div>
        <div className="columns">
          <div className="column">
            <span className="icon-text icon-text-pad">
              <span className="icon">
                <img src={clockLike} />
              </span>
              <span>En otro momento</span>
            </span>
          </div>
        </div>
        <div className="columns">
          <Swiper
            id="Swiper2"
            navigation
            slidesPerView={2}
            breakpoints={breakpoints}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {laters.map((later: any, i: number) => {
              return (
                <div className="column" key={`laters-${i}`}>
                  <SwiperSlide>
                    <LikeCard benefit={later} />
                  </SwiperSlide>
                </div>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MyLikesPage;

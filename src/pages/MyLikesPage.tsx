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
import { Benefit } from "../domain/entity/Benefit";
const MyLikesPage: React.FC = () => {
  const useCase = new UserdataUseCase();
  const { rut } = useContext(ContextApi);

  const [likes, setLikes] = useState([] as Benefit[]);
  const [laters, setLaters] = useState([] as Benefit[]);
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
      .then((data: Userdata) => {
        setLikes(cleanDuplicates(data.likes));
        setLaters(cleanDuplicates(data.later));
      });
  }, []);

  const cleanDuplicates = (benefits: Benefit[]) => {
    const cleans = benefits.reduce((out: Benefit[] = [], benefit: Benefit) => {
      if (out.length > 0) {
        const exists = out.filter((b) => b.id === benefit.id);
        if (exists.length > 0) return out;
        else return [...out, { ...benefit }];
      } else return [...out, { ...benefit }];
    }, []);
    return cleans;
  };

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

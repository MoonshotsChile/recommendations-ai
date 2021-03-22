import React, { useCallback, useContext, useEffect, useState } from "react";
import LikeCard from "../components/my-likes/Card";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";
import {
  Benefit,
  benefitMock,
  benefitsDecorator,
} from "../domain/entity/Benefit";
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
  const useCase = new BenefitsUseCase();
  const [likes, setLikes] = useState([benefitMock]);
  const [laters, setLaters] = useState([benefitMock]);
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
      .randomStack(25)
      .then((response: Response) => response.json())
      .then((data: Benefit[]) => {
        setLikes(benefitsDecorator(data));
      });

    useCase
      .randomStack(15)
      .then((response: Response) => response.json())
      .then((data: Benefit[]) => {
        setLaters(benefitsDecorator(data));
      });
  }, []);

  return (
    <div className="container">
      <Navbar selected={NAVBAR_ACTIONS.likes} />
      <div className="my-likes section">
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
          <Swiper id="Swiper1" navigation breakpoints={breakpoints}>
            {likes.map((like: Benefit, i: number) => {
              return (
                <div
                  id="LikesCard"
                  className="column is-6"
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
            breakpoints={breakpoints}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {laters.map((later: Benefit, i: number) => {
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

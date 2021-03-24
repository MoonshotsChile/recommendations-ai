import React, { useContext, useEffect, useState, useRef } from "react";
import LikeCard from "../components/my-likes/Card";

import { UserdataUseCase } from "../domain/UserdataUseCase";
import { Userdata } from "../domain/entity/Userdata";
import { clockLike, likeSelected } from "../assets";
import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

SwiperCore.use([Navigation]);
import "../components/my-likes/Card.scss";
import { Benefit, benefitsDecorator } from "../domain/entity/Benefit";
import TinderCard from "react-tinder-card";
import OfferCard from "../components/offer-card/OfferCard";
import TinderButtonNotLike from "../components/buttons/TinderButtonNotLike";

import TinderButtonLike from "../components/buttons/TinderButtonLike";

const MyLikesPage: React.FC = () => {
  const useCase = new UserdataUseCase();
  const lastCardRef = useRef(null);
  const userdataUseCase = new UserdataUseCase();

  const { rut, userdata, saveContext } = useContext(ContextApi);
  const [likes, setLikes] = useState([] as Benefit[]);
  const [laters, setLaters] = useState([] as Benefit[]);

  const [idBenefit, setIdBenefit] = useState("");
  const [benefit, setBenefit] = useState<Benefit>();
  const [tinderShow, setTinderShow] = useState("");

  const [tinderBottonShow, setTinderBottonShow] = useState("");

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
        setLikes(cleanDuplicates(benefitsDecorator(data.likes)));
        setLaters(cleanDuplicates(benefitsDecorator(data.later)));
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
  const likesHandleClick = (e: any) => {
    const result = likes.filter((l) => l.id === parseInt(e.target.id));
    setIdBenefit(e.target.id);
    if (result.length > 0) {
      setBenefit(result[0]);
      setTinderShow("");
    }
  };
  const latersHandleClick = (e: any) => {
    const result = laters.filter((l) => l.id === parseInt(e.target.id));
    setIdBenefit(e.target.id);
    if (result.length > 0) {
      setBenefit(result[0]);
      setTinderShow("");
      setTinderBottonShow("");
    }
  };

  const onLike = () => {
    // @ts-ignore
    dataLayer.push({
      event: "later",
      eventProps: {
        category: "locations",
        action: "swipe",
        label: "like",
        value: benefit,
      },
    });
    // @ts-ignore
    lastCardRef.current?.swipe("right");
    saveLike();
  };

  const onNotLike = () => {
    // @ts-ignore
    dataLayer.push({
      event: "later",
      eventProps: {
        category: "locations",
        action: "swipe",
        label: "not-like",
        value: benefit,
      },
    });
    // @ts-ignore
    lastCardRef.current?.swipe("left");
    saveNotLike();
  };

  const onLater = () => {
    // @ts-ignore
    dataLayer.push({
      event: "later",
      eventProps: {
        category: "locations",
        action: "swipe",
        label: "later",
        value: benefit,
      },
    });
    // @ts-ignore
    lastCardRef.current?.swipe("down");
    saveLater();
  };

  const saveLater = () => {
    if (userdata && benefit) {
      const later = [...userdata.later, ...[benefit]];
      userdata.later = later;
      saveContext({ userdata });
      userdataUseCase.later(rut!, later);
    }
  };

  const saveLike = () => {
    if (userdata && benefit) {
      const likes = [...userdata.likes, ...[benefit]];
      userdata.likes = likes;
      saveContext({ userdata });
      userdataUseCase.like(rut!, likes);
    }
  };

  const saveNotLike = () => {
    if (userdata && benefit) {
      const later = [...userdata.later, ...[benefit]];
      userdata.later = later;
      saveContext({ userdata });
      userdataUseCase.notLike(rut!, later);
    }
  };

  function onSwipe(direction: string) {
    switch (direction) {
      case "right":
        saveLike();
        break;
      case "left":
        saveNotLike();
        break;
      case "down":
        saveLater();
        break;
    }
  }
  const exit = () => {
    setTinderShow("is-hidden");
    setTinderBottonShow("is-hidden");
    setBenefit(undefined);
    setIdBenefit("");
  };
  return (
    <div className="container">
      <div className={`modal-tinder ${tinderShow}`}>
        {idBenefit !== "" && benefit !== undefined && (
          <div>
            <TinderCard
              ref={lastCardRef}
              {...{ className: "tinder-cards__card", style: { zIndex: 1 } }}
              key={benefit.id}
              preventSwipe={["up"]}
              onSwipe={onSwipe}
              onCardLeftScreen={() => setBenefit(undefined)}
            >
              <button
                className="delete is-large"
                aria-label="close"
                onClick={exit}
                style={{ zIndex: 4 }}
              />
              <OfferCard benefit={benefit} />
            </TinderCard>
          </div>
        )}
      </div>
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
              {likes.map((like: Benefit, i: number) => {
                return (
                  <div
                    id="LikesCard"
                    className="column"
                    key={`LikesCards-000${i.toString()}${Math.random().toString()}`}
                  >
                    <SwiperSlide key={`likes-swipper-${i}`}>
                      <LikeCard benefit={like} modalClick={likesHandleClick} />
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
                    <SwiperSlide key={`likes-swipper-${i}`}>
                      <LikeCard
                        benefit={later}
                        modalClick={latersHandleClick}
                      />
                    </SwiperSlide>
                  </div>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
      <div className={`modal-tinder ${tinderBottonShow}`}>
        {idBenefit !== "" && benefit !== undefined && (
          <div className="modal-card">
            <div className="card-footer hero-foot is-borderless">
              <p className="card-footer-item cursor-pointer is-borderless">
                <TinderButtonNotLike onClick={onNotLike} />
              </p>
              <p className="card-footer-item cursor-pointer is-borderless">
                <TinderButtonLike onClick={onLike} />
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLikesPage;

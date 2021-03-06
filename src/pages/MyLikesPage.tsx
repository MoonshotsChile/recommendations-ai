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
import { Benefit, BenefitReaction, benefitsDecorator } from "../domain/entity/Benefit";
import TinderCard from "react-tinder-card";
import OfferCard from "../components/offer-card/OfferCard";
import TinderButtonNotLike from "../components/buttons/TinderButtonNotLike";

import TinderButtonLike from "../components/buttons/TinderButtonLike";
import { authValidation } from "../components/hooks/authValidation";

const MyLikesPage: React.FC = () => {
  authValidation();

  const lastCardRef = useRef(null);
  const userdataUseCase = new UserdataUseCase();

  const { userdata, saveContext, location } = useContext(ContextApi);
  const [likes, setLikes] = useState([] as BenefitReaction[]);
  const [laters, setLaters] = useState([] as BenefitReaction[]);

  const [idBenefit, setIdBenefit] = useState("");
  const [benefit, setBenefit] = useState<Benefit>();
  const [tinderShow, setTinderShow] = useState("is-hidden");

  const [tinderBottonShow, setTinderBottonShow] = useState("is-hidden");

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
    userdataUseCase
      .find(userdata?.id || "")
      .then((response: Response) => response.json())
      .then((data: Userdata) => {
        console.log("data", data);

        data.likes && setLikes(cleanDuplicates(benefitsDecorator(data.likes)));
        data.later && setLaters(cleanDuplicates(benefitsDecorator(data.later)));
      });
  }, []);

  const cleanDuplicates = (benefits: BenefitReaction[]) => {
    const cleans = benefits.reduce((out: BenefitReaction[] = [], benefit: BenefitReaction) => {
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

    // @ts-ignore
    dataLayer.push({
      event: "view",
      eventProps: {
        category: "My-Likes",
        action: "swipe",
        label: "view-benefit",
        value: benefit,
      },
    });

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
        category: "my-likes",
        action: "swipe",
        label: "like",
        value: benefit,
      },
    });
    // @ts-ignore
    lastCardRef.current?.swipe("right");
  };

  const onNotLike = () => {
    // @ts-ignore
    dataLayer.push({
      event: "later",
      eventProps: {
        category: "my-likes",
        action: "swipe",
        label: "not-like",
        value: benefit,
      },
    });
    // @ts-ignore
    lastCardRef.current?.swipe("left")
  };


  function onSwipe(direction: string) {
    switch (direction) {
      case "right":
        userdataUseCase.saveLike(userdata!, benefit!, saveContext, location)
          if (userdata && benefit) {
            const likes =
                userdata.likes.length > 0
                    ? [...userdata.likes, ...[benefit]]
                    : [benefit];
            setLikes(cleanDuplicates(benefitsDecorator(likes)));
            removeLater()
          }
        break;
      case "left":
        userdataUseCase.saveNotLike(userdata!, benefit!, saveContext, location)
        removeLater()
        break;
      case "down":
        break;
    }
    hideTinder();
  }
  const exit = () => {
    hideTinder();
    setBenefit(undefined);
    setIdBenefit("");
  };
  const hideTinder = () => {
    setTinderShow("is-hidden");
    setTinderBottonShow("is-hidden");
  };

  const removeLater = () => {
    if (userdata && benefit) {
      const later = laters.filter((l) => l.id !== benefit.id);
      userdata.later = later;
      saveContext({ userdata });
      userdataUseCase.later(userdata.id!, later);
      setLaters(later);
    }
  };
  return (
    <div className="container">
      <div className={`modal-tinder`}>
        {idBenefit !== "" && benefit !== undefined && (
          <div>
            <div className={`modal-background`}></div>
            <button
              className="delete is-large"
              aria-label="close"
              onClick={exit}
            />
            <TinderCard
              ref={lastCardRef}
              {...{ className: "tinder-cards__card" }}
              key={benefit.id}
              preventSwipe={["up"]}
              onSwipe={onSwipe}
              onCardLeftScreen={() => setBenefit(undefined)}
            >
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

import * as React from "react";
import OnboardingCard from "../components/onboarding/OnboardingCard";
import "../components/onboarding/OnboardingCard.scss";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import { onboarding1, onboarding2, onboarding3, onboarding5 } from "../assets";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { ContextApi, Coord } from "../context-api/ContextApi";

SwiperCore.use([Navigation, Pagination]); //descomentar para habilitar

const OnboardingPage: React.FC = () => {
  const history = useHistory();
  const { saveContext } = useContext(ContextApi);
  const [reachEnd, setReachEnd] = useState(false);
  const [mySwiper, setMySwiper] = useState(Object);

  const goNext = () => {
    if (reachEnd) history.push("/offer");
    else {
      mySwiper.click();
    }
  };

  const onSlideChange = () => {
    console.log("change");
  };

  useEffect(() => {
    function onSuccess(coord: any) {
      saveContext({ location: coord });
    }

    function onError(error: any) {
      console.error(error)
    }

    if (reachEnd) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, [reachEnd]);

  return (
    <section className="onboarding hero is-fullheight">
      <section className="hero-body is-full">
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ clickable: false }}
          onSlideChange={onSlideChange}
          onSwiper={(swiper) => {
            setMySwiper(swiper.navigation.nextEl);
          }}
          onReachEnd={() => setReachEnd(true)}
        >
          <SwiperSlide>
            <OnboardingCard onboarding={onboarding1} />
          </SwiperSlide>

          <SwiperSlide>
            <OnboardingCard onboarding={onboarding2} />
          </SwiperSlide>

          <SwiperSlide>
            <OnboardingCard onboarding={onboarding3} />
          </SwiperSlide>

          <SwiperSlide>
            <OnboardingCard onboarding={onboarding5} />
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="hero-foot has-text-centered">
        <div className="columns is-mobile">
          <div className="column is-12">
            <button
              id="btn-fetch-data"
              className="button is-primary is-fullwidth is-inline has-text-centered"
              onClick={goNext}
            >
              Continuar
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default OnboardingPage;

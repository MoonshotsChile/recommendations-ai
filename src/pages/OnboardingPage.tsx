import * as React from "react";
import OnboardingCard from "../components/onboarding/OnboardingCard";
import "../components/onboarding/OnboardingCard.scss";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Navigation, Pagination]); //descomentar para habilitar

import { onboarding1, onboarding2, onboarding3, onboarding5 } from "../assets";

const OnboardingPage: React.FC = () => {
  return (
    <Swiper
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
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
  );
};

export default OnboardingPage;

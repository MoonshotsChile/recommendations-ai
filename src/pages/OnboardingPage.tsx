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
import { ContextApi, coord } from "../context-api/ContextApi";

SwiperCore.use([Navigation, Pagination]); //descomentar para habilitar

const OnboardingPage: React.FC = () => {
    const history = useHistory();
    const { saveContext } = useContext(ContextApi)
    const [reachEnd, setReachEnd] = useState(false);

    const goNext = () => {
        history.push("/offer");
    };

    const onSlideChange = () => {
      console.log("change")
    }

    useEffect(()=>{
      function success(coord: any) {
        saveContext({location: coord})
      }
      if (reachEnd) {
        navigator.geolocation.getCurrentPosition(success);
      }
    }, [reachEnd])

    return (
        <section className="onboarding hero is-fullheight">
            <section className="hero-body is-full">
                <Swiper
                    slidesPerView={1}
                    navigation
                    pagination={{clickable: false}}
                    onSlideChange={onSlideChange}
                    onSwiper={(swiper) => console.log(swiper)}
                    onReachEnd={() => setReachEnd(true)}
                >
                    <SwiperSlide>
                        <OnboardingCard onboarding={onboarding1}/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <OnboardingCard onboarding={onboarding2}/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <OnboardingCard onboarding={onboarding3}/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <OnboardingCard onboarding={onboarding5}/>
                    </SwiperSlide>
                </Swiper>
            </section>
            <section className="hero-foot has-text-centered">
                <div className="column is-three-quarter">
                    <button id="btn-fetch-data" className="button is-primary is-fullwidth is-inline has-text-centered"
                            onClick={goNext}>
                        Continuar
                    </button>
                </div>
            </section>
        </section>
    );
};

export default OnboardingPage;

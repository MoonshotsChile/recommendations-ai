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

SwiperCore.use([Navigation, Pagination]); //descomentar para habilitar

const OnboardingPage: React.FC = () => {
    const history = useHistory()

    const goNext = () => {
        history.push('/offer')
    }

    return (
        <section className="onboarding hero is-fullheight">
            <section className="hero-body is-full">
                <Swiper
                    slidesPerView={1}
                    navigation
                    pagination={{clickable: true}}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
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
                    <button id="btn-fetch-data" className="button is-primary is-fullwidth is-inline has-text-centered" onClick={goNext}>
                        Continuar
                    </button>
                </div>
            </section>
        </section>
    );
};

export default OnboardingPage;

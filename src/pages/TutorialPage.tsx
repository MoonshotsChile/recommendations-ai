import * as React from 'react';
import TinderButtonLater from "../components/buttons/TinderButtonLater";
import TinderButtonNotLike from "../components/buttons/TinderButtonNotLike";
import TinderButtonLike from "../components/buttons/TinderButtonLike";
import Navbar from "../components/navbar/Navbar";
import { NAVBAR_ACTIONS } from "../context-api/ContextApi";
import { Swiper, SwiperSlide } from "swiper/react";

const TutorialPage: React.FC = () => {
    return (
        <>
            <Navbar selected={NAVBAR_ACTIONS.matchs}/>
            <div className="section">
                <div className="columns">
                        <Swiper
                            slidesPerView={1}
                        >
                            <SwiperSlide>
                                <div className='card'>
                                    <div className='card-content'>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='card'>
                                    <div className='card-content'>
                                        Fuu
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='card'>
                                    <div className='card-content'>
                                        Fuu
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='card'>
                                    <div className='card-content'>
                                        Fuu
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='card'>
                                    <div className='card-content'>
                                        Fuu
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                </div>
                <div className='card-footer hero-foot is-borderless is-fixed-bottom'>
                    <p className="card-footer-item cursor-pointer is-borderless">
                        <TinderButtonNotLike disabled={true} onClick={() => {
                            console.log('fuu')
                        }}/>
                    </p>
                    <p className="card-footer-item cursor-pointer is-borderless">
                        <TinderButtonLater disabled={true} onClick={() => {
                            console.log('fuu')
                        }}/>
                    </p>
                    <p className="card-footer-item cursor-pointer is-borderless">
                        <TinderButtonLike disabled={true} onClick={() => {
                            console.log('fuu')
                        }}/>
                    </p>
                </div>
            </div>
        </>
    );
}

export default TutorialPage;

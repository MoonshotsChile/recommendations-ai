import * as React from 'react';
import { useState } from 'react';
import TinderButtonLater from "../components/buttons/TinderButtonLater";
import TinderButtonNotLike from "../components/buttons/TinderButtonNotLike";
import TinderButtonLike from "../components/buttons/TinderButtonLike";
import Navbar from "../components/navbar/Navbar";
import { NAVBAR_ACTIONS } from "../context-api/ContextApi";
import { Swiper, SwiperSlide } from "swiper/react";
import TutorialCard from "../components/cards/TutorialCard";
import {
    bellRed,
    handHello,
    handSlideDown,
    handSlideLeft,
    handSlideRight,
    mapMarkerGoogle,
    marker,
    rocket
} from "../assets";
import { useHistory } from 'react-router-dom';
import ListItem from "../components/cards/ListItem";

const TutorialPage: React.FC = () => {
    const [reachEnd, setReachEnd] = useState(false);
    const [mySwiper, setMySwiper] = useState(Object);
    const history = useHistory();

    const goNext = () => {
        if (reachEnd) history.push("/offer");
        else {
            mySwiper.click();
        }
    };

    return (
        <>
            <Navbar selected={NAVBAR_ACTIONS.matchs}/>
            <div className="section">
                <div className="columns">
                    <Swiper
                        slidesPerView={1}
                        onReachEnd={() => setReachEnd(true)}
                        onReachBeginning={() => setReachEnd(false)}
                        onSwiper={(swiper) => {
                            setMySwiper(swiper.navigation.nextEl);
                        }}
                    >
                        <SwiperSlide>
                            <TutorialCard
                                icon={handHello}
                                title="¡Vamos a empezar!"
                                subtitle="Aquí esta todo lo que necesitas saber"
                                action={{
                                    onClick: goNext,
                                    title: 'Comenzar Tutorial'
                                }}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TutorialCard
                                icon={handSlideLeft}
                                title="Desliza hacia la izquierda para pasar"
                                subtitle="Si no te gusta el beneficio, pasa hasta encontrar uno de tu interes"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TutorialCard
                                icon={handSlideRight}
                                title="Desliza hacia la derecha para dar like"
                                subtitle="Al dar like el beneficio se ira guardando en tu configuración"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TutorialCard
                                icon={handSlideDown}
                                title="Desliza hacia abajo para postergar"
                                subtitle="Guardamos el beneficio para mostrartelo en otro momento"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TutorialCard
                                title="¡Aun hay más!"
                                action={{
                                    onClick: () => {
                                    },
                                    title: 'Comenzar Tutorial'
                                }}
                            />
                            <ul>
                                <ListItem icon={rocket} text="Completa las misiones y gana fantásticos premios" />
                                <ListItem icon={mapMarkerGoogle} text="Descubre beneficios cerca de tu ubicación" />
                                <ListItem icon={bellRed} text="Te avisamos cuando necesites un descuento" />
                            </ul>
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

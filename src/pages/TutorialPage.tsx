import * as React from 'react';
import { useRef, useState } from 'react';
import TinderButtonLater from "../components/buttons/TinderButtonLater";
import TinderButtonNotLike from "../components/buttons/TinderButtonNotLike";
import TinderButtonLike from "../components/buttons/TinderButtonLike";
import Navbar from "../components/navbar/Navbar";
import { NAVBAR_ACTIONS } from "../context-api/ContextApi";
import TutorialCard from "../components/tutorial-card/TutorialCard";
import {
    bellRed,
    handHello,
    handSlideDown,
    handSlideLeft,
    handSlideRight,
    mapMarkerGoogle,
    rocket
} from "../assets";
import { useHistory } from 'react-router-dom';
import ListItem from "../components/tutorial-card/ListItem";
import TinderCard from "react-tinder-card";
import { authValidation } from "../components/hooks/authValidation";

const TutorialPage = (): JSX.Element => {
    authValidation()

    const [step, setStep] = useState(1)
    const likeCardRef = useRef(null)
    const notLikeCardRef = useRef(null)
    const laterCardRef = useRef(null)
    const history = useHistory();


    const onLike = () => {
        // @ts-ignore
        likeCardRef.current?.swipe('right')

    }

    const onNotLike = () => {
        // @ts-ignore
        notLikeCardRef.current?.swipe('left')
    }

    const onLater = () => {
        // @ts-ignore
        laterCardRef.current?.swipe('down')
    }


    return (
        <div className="container">
            <Navbar selected={NAVBAR_ACTIONS.matchs}/>
            <div className='tutorial hero is-fullheight-with-footer'>
                <div className='hero-head'>
                    {step === 1 && (
                        <TutorialCard
                            icon={handHello}
                            title="¡Vamos a empezar!"
                            subtitle="Aquí esta todo lo que necesitas saber"
                            action={{
                                onClick: () => setStep(2),
                                title: 'Comenzar Tutorial'
                            }}
                        />
                    )}
                    {step >= 2 && step <= 5 && (
                        <div className="tinder-cards__container">
                            <TutorialCard
                                title="¡Aun hay más!"
                                action={{
                                    onClick: () => {
                                        history.push('/offer')
                                    },
                                    title: '!Vamos!'
                                }}
                            >
                                <ul>
                                    <ListItem icon={rocket}
                                              text="Completa las misiones y gana fantásticos premios"/>
                                    <ListItem icon={mapMarkerGoogle}
                                              text="Descubre beneficios cerca de tu ubicación"/>
                                    <ListItem icon={bellRed} text="Te avisamos cuando necesites un descuento"/>
                                </ul>
                            </TutorialCard>
                            <TinderCard preventSwipe={['left', 'right', 'up']} ref={laterCardRef}
                                        onSwipe={() => setStep(5)}>
                                <TutorialCard
                                    icon={handSlideDown}
                                    title="Desliza hacia abajo para postergar"
                                    subtitle="Guardamos el beneficio para mostrartelo en otro momento"
                                    zIndex={3}
                                />
                            </TinderCard>
                            <TinderCard preventSwipe={['left', 'up', 'down']} ref={likeCardRef}
                                        onSwipe={() => setStep(4)}>
                                <TutorialCard
                                    icon={handSlideRight}
                                    title="Desliza hacia la derecha para dar like"
                                    subtitle="Al dar like el beneficio se ira guardando en tu configuración"
                                    zIndex={2}
                                />
                            </TinderCard>
                            <TinderCard preventSwipe={['right', 'up', 'down']} ref={notLikeCardRef}
                                        onSwipe={() => setStep(3)}>
                                <TutorialCard
                                    icon={handSlideLeft}
                                    title="Desliza hacia la izquierda para pasar"
                                    subtitle="Si no te gusta el beneficio, pasa hasta encontrar uno de tu interes"
                                    zIndex={1}
                                />
                            </TinderCard>
                        </div>
                    )}
                </div>
                <div className='card-footer hero-foot is-borderless'>
                    <p className="card-footer-item cursor-pointer is-borderless">
                        <TinderButtonNotLike disabled={step !== 2} onClick={onNotLike}/>
                    </p>
                    <p className="card-footer-item cursor-pointer is-borderless">
                        <TinderButtonLater disabled={step !== 4} onClick={onLater}/>
                    </p>
                    <p className="card-footer-item cursor-pointer is-borderless">
                        <TinderButtonLike disabled={step !== 3} onClick={onLike}/>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TutorialPage;

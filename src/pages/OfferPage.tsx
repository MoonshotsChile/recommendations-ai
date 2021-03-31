import React, { useContext, useEffect, useRef, useState } from 'react';
import { BenefitsUseCase } from "../domain/BenefitsUseCase";
import TinderCard from "react-tinder-card";
import { Benefit, benefitsDecorator } from "../domain/entity/Benefit";
import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";
import OfferCard from "../components/offer-card/OfferCard";
import TinderButtonNotLike from "../components/buttons/TinderButtonNotLike";
import TinderButtonLater from "../components/buttons/TinderButtonLater";
import TinderButtonLike from "../components/buttons/TinderButtonLike";
import { UserdataUseCase } from "../domain/UserdataUseCase";
import { dataLayerPush } from "../config/analytics";
import { authValidation } from "../components/hooks/authValidation";

const OfferPage = (): JSX.Element => {
    authValidation()

    const benefitsUseCase = new BenefitsUseCase()
    const userdataUseCase = new UserdataUseCase()
    const { saveContext, userdata, location } = useContext(ContextApi)
    const [benefits, setBenefits] = useState([] as Benefit[])
    const lastCardRef = useRef(null)

    useEffect(() => {
        getInitialBenefits()
    }, [])

    const getInitialBenefits = (): void => {
        benefitsUseCase.randomStack(2)
            .then((response: Response) => response.json())
            .then((data: Benefit[]) => {
                setBenefits(
                    benefitsDecorator(data)
                )
            })
    }

    const getNextBenefits = (): void => {
        benefitsUseCase.random()
            .then((response: Response) => response.json())
            .then((data: Benefit[]) => {
                setBenefits(prevBenefits => {
                    data = benefitsDecorator(data)
                    return [
                        data[0],
                        prevBenefits[0]
                    ];
                })
            })
    }

    const currentBenefit = () => {
        return benefits[1]
    }


    const onLike = () => {
        // @ts-ignore
        lastCardRef.current?.swipe('right')
    }

    const onNotLike = () => {
        // @ts-ignore
        lastCardRef.current?.swipe('left')
    }

    const onLater = () => {
        // @ts-ignore
        lastCardRef.current?.swipe('down')
    }

    const outOfFrame = () => {
        getNextBenefits()
    }

    function onSwipe(direction: string) {
        switch (direction) {
            case 'right':
                dataLayerPush({
                    event: 'reaction',
                    eventProps: {
                        category: 'offers',
                        action: 'swipe',
                        label: 'like',
                        value: currentBenefit()
                    }
                })
                userdataUseCase.saveLike(userdata!, currentBenefit()!, saveContext, location)
                break
            case 'left':
                dataLayerPush({
                    event: 'reaction',
                    eventProps: {
                        category: 'offers',
                        action: 'swipe',
                        label: 'not-like',
                        value: currentBenefit()
                    }
                })
                userdataUseCase.saveNotLike(userdata!, currentBenefit()!, saveContext, location)
                break
            case 'down':
                dataLayerPush({
                    event: 'reaction',
                    eventProps: {
                        category: 'offers',
                        action: 'swipe',
                        label: 'later',
                        value: currentBenefit()
                    }
                })
                userdataUseCase.saveLater(userdata!, currentBenefit()!, saveContext, location)
                break
        }
    }

    return (
        <div className="container">
            <Navbar selected={NAVBAR_ACTIONS.matchs}/>
            <div className='offers hero is-fullheight-with-footer'>
                <div className='hero-head'>
                    <div className='tinder-cards'>
                        {benefits.map((benefit: Benefit, i: number) => (
                            <TinderCard
                                {...{className: 'tinder-cards__card'}}
                                key={benefit.id}
                                preventSwipe={['up']}
                                ref={lastCardRef}
                                onSwipe={onSwipe}
                                flickOnSwipe={true}
                                onCardLeftScreen={outOfFrame}
                            >
                                <OfferCard
                                    benefit={benefit}
                                    zIndex={i === benefits.length - 1 ? 1 : 0}
                                />
                            </TinderCard>
                        ))}
                    </div>
                </div>
                <div className='card-footer hero-foot is-borderless'>
                    <p className="card-footer-item cursor-pointer is-borderless">
                        <TinderButtonNotLike onClick={onNotLike}/>
                    </p>
                    <p className="card-footer-item cursor-pointer is-borderless">
                        <TinderButtonLater onClick={onLater}/>
                    </p>
                    <p className="card-footer-item cursor-pointer is-borderless">
                        <TinderButtonLike onClick={onLike}/>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OfferPage;

import React, { useContext, useEffect, useState } from 'react';
import { BenefitsUseCase } from "../domain/BenefitsUseCase";
import TinderCard from "react-tinder-card";
import { Benefit, benefitsDecorator } from "../domain/entity/Benefit";
import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";
import { tinderButtonLaterIcon, tinderButtonLikeIcon, tinderButtonNoIcon } from "../assets";
import OfferCard from "../components/offer-card/OfferCard";
import { authValidation } from "../components/hooks/authValidation";

const OfferPage = (): JSX.Element => {
    const useCase = new BenefitsUseCase()
    const { saveContext } = useContext(ContextApi)
    const [benefits, setBenefits] = useState([] as Benefit[])
    const lastCardRef = React.useRef(null)

    // authValidation()

    useEffect(() => {
        getInitialBenefits()
    }, [])

    const getInitialBenefits = (): void => {
        useCase.randomStack(2)
            .then((response: Response) => response.json())
            .then((data: Benefit[]) => {
                setBenefits(
                    benefitsDecorator(data)
                )
            })
    }

    const getNextBenefits = (): void => {
        useCase.random()
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


    const onLike = () => {
        // @ts-ignore
        lastCardRef.current?.swipe('right')

    }

    const onNotLike = () => {
        // @ts-ignore
        lastCardRef.current?.swipe('left')
    }

    const onLater = (elem?: any) => {
        console.log(lastCardRef)
        // @ts-ignore
        lastCardRef.current?.swipe('down')
    }


    const swiped = (direction: string, nameToDelete: number) => {
        console.log('removing:' + nameToDelete)
        getNextBenefits()
    }

    const outOfFrame = (name: number) => {
        console.log(name + ' left the screen!')
        getNextBenefits()
    }

    return (
        <>
            <Navbar selected={NAVBAR_ACTIONS.matchs}/>
            <div className='hero is-fullheight-with-footer'>
                <div className='hero-head'>
                    <div className='tinderCards__cardContainer'>
                        {benefits.map((benefit: Benefit, i: number) => (
                            <TinderCard
                                key={benefit.id}
                                preventSwipe={['up']}
                                ref={lastCardRef}
                                // onSwipe={(dir) => swiped(dir, benefit.id)}
                                onCardLeftScreen={() => outOfFrame(benefit.id)}
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
                        <img src={tinderButtonNoIcon} onClick={onNotLike} alt="not like"/>
                    </p>
                    <p className="card-footer-item cursor-pointer is-borderless">
                        <img src={tinderButtonLaterIcon} onClick={onLater} alt="later"/>
                    </p>
                    <p className="card-footer-item cursor-pointer is-borderless">
                        <img src={tinderButtonLikeIcon} onClick={onLike} alt="like"/>
                    </p>
                </div>
            </div>
        </>
    );
}

export default OfferPage;

import React, { FC, useEffect, useMemo, useState } from 'react';
import OfferCard from "../components/offer-card/OfferCard";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";
import TinderCard from "react-tinder-card";
import { Benefit, benefitMock } from "../domain/entity/Benefit";

const OfferPage: FC = () => {
    const useCase = new BenefitsUseCase()
    const [ benefits, setBenefits ] = useState([] as Benefit[])
    const lastCardRef = React.useRef(null)

    useEffect(() => {
        console.log('useEffect')
        getInitialBenefits()
    }, [])

    const getInitialBenefits = (): void => {
        useCase.randomStack(2)
            .then((response: Response) => response.json())
            .then((data: Benefit[]) => {
                setBenefits(data)
            })
    }

    const getNextBenefits = (): void => {
        useCase.random()
            .then((response: Response) => response.json())
            .then((data: Benefit[]) => {
                setBenefits(prevBenefits => {
                    console.log(prevBenefits, data)
                    return [
                        data[0],
                        prevBenefits[0],
                    ];
                })
            })
    }


    const onLike = () => {
        getNextBenefits()
        // @ts-ignore
        //lastCardRef.current?.swipe('left')

    }

    const onNotLike = () => {
        getNextBenefits()
    }

    const onLater = () => {
        getNextBenefits()
    }


    return (
        <div className="section">
            {benefits.map((benefit: Benefit, i: number) => (
                <TinderCard ref={i===benefits.length -1 ? lastCardRef : undefined} flickOnSwipe={false} key={`benefit-card${i}`} onSwipe={onLike} onCardLeftScreen={onNotLike}>
                    <OfferCard benefit={benefit} zIndex={i===benefits.length -1  ? 1 : undefined} onLater={onLater} onLike={onLike} onNotLike={onNotLike}/>
                </TinderCard>
            ))}
        </div>
    );
}

export default OfferPage;

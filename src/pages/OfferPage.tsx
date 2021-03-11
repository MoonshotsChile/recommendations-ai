import React, { FC, useEffect, useState } from 'react';
import OfferCard from "../components/offer-card/OfferCard";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";
import TinderCard from "react-tinder-card";
import { Benefit, benefitMock } from "../domain/entity/Benefit";

const OfferPage: FC = () => {
    const useCase = new BenefitsUseCase()
    const [ benefit, setBenefit ] = useState(benefitMock)


    const onSwipe = (direction: string) => {
        console.log(benefit)
        console.log(`You swiped: ${direction}`)
    }

    const onCardLeftScreen = (myIdentifier: string) => {
        console.log(benefit)
        console.log(`${myIdentifier} left the screen`)
    }

    useEffect(() => {
        useCase.random()
            .then((response: Response) => response.json())
            .then((data: Benefit[]) => {
                setBenefit(data[0])
            })
    }, [])


    const onLike = () => {

    }

    const onNotLike = () => {

    }

    const onLater = () => {

    }

    return (
        <div className="section">
            <TinderCard  onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')}>
                <OfferCard benefit={benefit} onLater={onLater} onLike={onLike} onNotLike={onNotLike}/>
            </TinderCard>
        </div>
    );
}

export default OfferPage;

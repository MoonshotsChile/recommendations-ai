import React, { FC, useEffect } from 'react';
import OfferCard from "../components/offer-card/OfferCard";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";
import TinderCard from "react-tinder-card";

const OfferPage: FC = () => {
    const useCase = new BenefitsUseCase()

    const onSwipe = (direction: string) => {
        console.log(`You swiped: ${direction}`)
    }

    const onCardLeftScreen = (myIdentifier: string) => {
        console.log(`${myIdentifier} left the screen`)
    }

    useEffect(() => {
        useCase.list().then((data: Response)=> console.log(data.json()))
    })

    return (
        <div className="section">
            <TinderCard  onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')}>
                <OfferCard/>
            </TinderCard>
        </div>
    );
}

export default OfferPage;

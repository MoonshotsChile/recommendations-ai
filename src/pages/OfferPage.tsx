import React, { FC, useEffect, useState } from 'react';
import OfferCard from "../components/offer-card/OfferCard";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";
import TinderCard from "react-tinder-card";
import { Benefit, benefitMock } from "../domain/entity/Benefit";

const OfferPage: FC = () => {
    const useCase = new BenefitsUseCase()
    const [ benefit, setBenefit ] = useState(benefitMock)


    useEffect(() => {
        useCase.random()
            .then((response: Response) => response.json())
            .then((data: Benefit[]) => {
                setBenefit(data[0])
            })
    }, [])


    const onLike = () => {
        setBenefitCard(nextBenefitCard)

    }

    const onNotLike = () => {

    }

    const onLater = () => {
    }

    const nextBenefitCard = () => {
        return (
            <OfferCard benefit={benefit} onLater={onLater} onLike={onLike} onNotLike={onNotLike}/>
        )
    }

    const [ benefitCard, setBenefitCard] = useState(nextBenefitCard())


    return (
        <div className="section">
            <TinderCard onSwipe={onLike} onCardLeftScreen={onNotLike}>
                {nextBenefitCard()}
            </TinderCard>
        </div>
    );
}

export default OfferPage;

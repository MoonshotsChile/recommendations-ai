import React, { FC, useContext, useEffect, useState } from 'react';
import OfferCard from "../components/offer-card/OfferCard";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";
import TinderCard from "react-tinder-card";
import { Benefit, benefitsDecorator } from "../domain/entity/Benefit";
import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";

const OfferPage: FC = () => {
    const useCase = new BenefitsUseCase()
    const { saveContext } = useContext(ContextApi)
    const [ benefits, setBenefits ] = useState([] as Benefit[])
    const lastCardRef = React.useRef(null)

    useEffect(() => {
        saveContext({navbarSelected: NAVBAR_ACTIONS.likes})
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
        getNextBenefits()
        // @ts-ignore
        //lastCardRef.current?.swipe('left')

    }

    const onNotLike = () => {
        getNextBenefits()
    }

    const onLater = (elem?: any) => {
        console.log(elem)
        getNextBenefits()
    }


    return (
        <>
            <Navbar selected={NAVBAR_ACTIONS.likes}/>
            <div className="section">
                {benefits.map((benefit: Benefit, i: number) => (
                    <TinderCard ref={i===benefits.length -1 ? lastCardRef : undefined} flickOnSwipe={false} key={`benefit-card${i}`} onSwipe={onLike} onCardLeftScreen={onNotLike}>
                        <OfferCard benefit={benefit} zIndex={i===benefits.length -1  ? 1 : undefined} onLater={() => onLater(this)} onLike={onLike} onNotLike={onNotLike}/>
                    </TinderCard>
                ))}
            </div>
        </>
    );
}

export default OfferPage;

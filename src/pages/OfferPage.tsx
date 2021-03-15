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
            <Navbar selected={NAVBAR_ACTIONS.likes}/>
            <div className='tinderCards'>
                <div className='tinderCards__cardContainer'>
                {benefits.map((benefit: Benefit, i: number) => (
                    <TinderCard
                        key={benefit.id}
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, benefit.id)}
                        onCardLeftScreen={() => outOfFrame(benefit.id)}
                    >
                        <div
                            className='tinderCards__card'
                            style={{zIndex: i===benefits.length -1  ? 1 : undefined}}
                        >
                            <div className="card-content">
                                <div className="card-image">
                                    <figure className="image">
                                        <img
                                            className=""
                                            src={benefit.covers[0]}
                                            alt="Placeholder image"
                                        />
                                    </figure>
                                </div>
                                <p className="title">
                                    {benefit.title}
                                </p>
                            </div>
                        </div>
                    </TinderCard>
                ))}
                </div>
            </div>
        </>
    );
}

export default OfferPage;

import React, { FC, useEffect } from 'react';
import OfferCard from "../components/offer-card/OfferCard";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";

const OfferPage: FC = () => {
    const useCase = new BenefitsUseCase()

    useEffect(() => {
        useCase.list().then((data: Response)=> console.log(data.json()))
    })

    return (
        <div className="section">
            <OfferCard/>
        </div>
    );
}

export default OfferPage;

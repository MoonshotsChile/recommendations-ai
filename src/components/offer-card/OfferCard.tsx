import React from "react";
import { Benefit } from "../../domain/entity/Benefit";
import './OfferCard.scss'

interface PropsOfferCard {
    benefit: Benefit,
    zIndex?: number,
    onNotLike?: ()=>void,
    onLater?: ()=>void,
    onLike?: ()=>void
}

const OfferCard = (props: PropsOfferCard): JSX.Element => {
    const benefit = props.benefit

    return (
        <div className="stacked-card card" style={{zIndex: props.zIndex}}>
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
    )
}

export default OfferCard

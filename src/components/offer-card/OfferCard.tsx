import React from "react";
import { Benefit } from "../../domain/entity/Benefit";
import './OfferCard.scss'

interface PropsOfferCard {
    benefit: Benefit,
    zIndex?: number,
}

const OfferCard = (props: PropsOfferCard): JSX.Element => {
    const benefit = props.benefit
    const zIndex = props.zIndex

    return (
        <div
            className='card'
            style={{zIndex}}
        >
            <div className="tinder-cards__card__content">
                <div className="tinder-cards__card__image">
                    <img
                        src={benefit.covers[0]}
                        alt="Placeholder image"
                    />
                </div>
                <div className="tinder-cards__card__footer">
                    <div className="is-fullwidth category">
                        <p>
                            {benefit.category}
                        </p>
                    </div>
                    <div className="is-fullwidth title">
                        <p>
                            {benefit.title}
                        </p>
                    </div>
                    <div className="is-fullwidth has-text-weight-light" dangerouslySetInnerHTML={{__html: benefit.description}}/>
                </div>
            </div>
        </div>
    )
}

export default OfferCard

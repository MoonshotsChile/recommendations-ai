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
            className='tinderCards__card'
            style={{zIndex}}
        >
            <div className="tinderCards__card__content">
                <div className="tinderCards__card__image">
                    <img
                        src={benefit.covers[0]}
                        alt="Placeholder image"
                    />
                </div>
                <div className="tinderCards__card__footer columns">
                    <div className="column is-fullwidth category">
                        <p>
                            {benefit.category}
                        </p>
                    </div>
                    <div className="column is-fullwidth title">
                        <p>
                            {benefit.title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfferCard

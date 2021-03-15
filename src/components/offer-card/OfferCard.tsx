import React from "react";
import { Benefit } from "../../domain/entity/Benefit";
import { tinderButtonLaterIcon, tinderButtonLikeIcon, tinderButtonNoIcon } from "../../assets";
import './OfferCard.scss'

interface PropsOfferCard {
    benefit: Benefit,
    zIndex?: number,
    onNotLike: ()=>void,
    onLater: ()=>void,
    onLike: ()=>void
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
                <p className="subtitle">
                    {benefit.category}
                </p>
            </div>
            <footer className="card-footer">
                <p className="card-footer-item">
                  <img src={tinderButtonNoIcon} onClick={props.onNotLike} alt="not like"/>
                </p>
                <p className="card-footer-item">
                    <img src={tinderButtonLaterIcon} onClick={props.onLater} alt="like"/>
                </p>
                <p className="card-footer-item">
                    <img src={tinderButtonLikeIcon} onClick={props.onLike} alt="later"/>
                </p>
            </footer>
        </div>
    )
}

export default OfferCard

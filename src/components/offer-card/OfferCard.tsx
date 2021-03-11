import React, { FC } from "react";
import { Benefit } from "../../domain/entity/Benefit";
import { tinderButtonLaterIcon, tinderButtonLikeIcon, tinderButtonNoIcon } from "../../assets";

interface PropsOfferCard {
    benefit: Benefit,
    onNotLike: ()=>void,
    onLater: ()=>void,
    onLike: ()=>void,
}

const OfferCard = (props: PropsOfferCard): JSX.Element => {
    const benefit = props.benefit

    return (
        <div className="card">
            <div className="card-content">
                <p className="title">
                    {benefit.title}
                </p>
                <p className="subtitle">
                    {benefit.category}
                </p>
            </div>
            <footer className="card-footer">
                <p className="card-footer-item">
                  <img src={tinderButtonNoIcon} onClick={props.onNotLike} />
                </p>
                <p className="card-footer-item">
                    <img src={tinderButtonLaterIcon} onClick={props.onLater} />
                </p>
                <p className="card-footer-item">
                    <img src={tinderButtonLikeIcon} onClick={props.onLike}  />
                </p>
            </footer>
        </div>
    )
}

export default OfferCard

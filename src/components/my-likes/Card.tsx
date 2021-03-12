import React, { FC } from "react";
import { Benefit } from "../../domain/entity/Benefit";

interface PropsOfferCard {
  benefit: Benefit;
}
const LikeCard = (props: PropsOfferCard): JSX.Element => {
  const benefit = props.benefit;
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img
            className=""
            src={benefit.covers[0] !== undefined ? benefit.covers[0] : ""}
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        <p className="title">{benefit.title}</p>
        <p className="subtitle">{benefit.category}</p>
      </div>
    </div>
  );
};

export default LikeCard;

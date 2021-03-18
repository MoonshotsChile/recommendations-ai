import React, { FC } from "react";
import { Benefit } from "../../domain/entity/Benefit";
import "./Mision.scss";
import "swiper/swiper.scss";
interface PropsCard {
  benefit: Benefit;
}
const DisponiblesCard = (props: PropsCard): JSX.Element => {
  const benefit = props.benefit;
  return (
    <div className="mision card is-horizontal columns">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                //src="https://versions.bulma.io/0.6.1/images/placeholders/96x96.png"
                src={benefit.covers[0] !== undefined ? benefit.covers[0] : ""}
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{benefit.title}</p>
            <p className="subtitle is-6">{benefit.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisponiblesCard;

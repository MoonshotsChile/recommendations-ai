import React from "react";
import { Disponible } from "../../domain/entity/Mision";
import "./Mision.scss";
import "swiper/swiper.scss";
interface PropsCard {
  mision: Disponible;
}
const DisponiblesCard = (props: PropsCard): JSX.Element => {
  const mision = props.mision;
  return (
    <div className="mision card is-horizontal">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={mision.img} alt="Placeholder image" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-6">{mision.title}</p>
            <p className="subtitle is-6">{mision.subTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisponiblesCard;

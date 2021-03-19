import React, { FC } from "react";
import { EnCurso } from "../../domain/entity/Mision";
import "./Mision.scss";
import "swiper/swiper.scss";
import { default as rappi } from "./dbTemp/img/rappi.svg";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface PropsCard {
  mision: EnCurso;
}
const EnCursoCard = (props: PropsCard): JSX.Element => {
  const mision = props.mision;
  console.log("rappi", rappi);

  return (
    <div className="mision card is-horizontal">
      <div className="card-content">
        <div className="columns is-mobile">
          <div className="column">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={mision.img} alt="Placeholder image" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-6">{mision.prize}</p>
                <p className="subtitle is-6">Estatus: {mision.status}</p>
                <p className="subtitle is-6">Tiempo: {mision.time}</p>
              </div>
            </div>
          </div>
          <div className="column is-one-fifth">
            <CircularProgressbarWithChildren
              value={mision.percentCircle}
              styles={buildStyles({
                pathColor: mision.colorCircle,
                trailColor: "#DFE8EE",
              })}
            >
              <div
                style={{
                  fontSize: 12,
                  marginTop: -5,
                  textAlign: "center",
                }}
              >
                <strong style={{ color: mision.colorTextCircle }}>
                  {mision.titleCircle}
                </strong>
                <p style={{ color: mision.colorTextCircle }}>
                  {mision.subTitleCircle}
                </p>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnCursoCard;

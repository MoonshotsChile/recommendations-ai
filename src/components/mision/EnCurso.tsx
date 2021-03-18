import React, { FC } from "react";
import { Benefit } from "../../domain/entity/Benefit";
import "./Mision.scss";
import "swiper/swiper.scss";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface PropsCard {
  benefit: Benefit;
}
const EnCursoCard = (props: PropsCard): JSX.Element => {
  const benefit = props.benefit;
  return (
    <div className="mision card is-horizontal">
      <div className="card-content">
        <div className="columns is-mobile">
          <div className="column is-three-quarters">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img
                    src={
                      benefit.covers[0] !== undefined ? benefit.covers[0] : ""
                    }
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-6">{benefit.title}</p>
                <p className="subtitle is-6">{benefit.category}</p>
              </div>
            </div>{" "}
          </div>
          <div className="column">
            <CircularProgressbarWithChildren
              value={66}
              styles={buildStyles({
                textColor: "#4449F0",
                pathColor: "#4449F0",
                trailColor: "#DFE8EE",
              })}
            >
              {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
              {/* <img
                style={{ width: 40, marginTop: -5 }}
                src="https://i.imgur.com/b9NyUGm.png"
                alt="doge"
              /> */}
              <div style={{ fontSize: 12, marginTop: -5 }}>
                <strong>2</strong> min.
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnCursoCard;

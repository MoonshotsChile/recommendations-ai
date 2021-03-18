import React, { FC } from "react";
import { Benefit } from "../../domain/entity/Benefit";
import "../mision/Mision.scss";
import "swiper/swiper.scss";
import { useContext, useEffect, useRef, useState } from "react";
interface PropsCard {
  benefit: Benefit;
}
const OnboardingInteresesCard = (): JSX.Element => {
  // const benefit = props.benefit;
  const [reachEnd, setReachEnd] = useState(false);
  const selectedButtonState = (e: any) => {
    const exist = e.target.className.includes("is-primary");
    if (exist) {
      e.target.setAttribute(
        "class",
        "button is-one-fifth is-inline has-text-centered"
      );
    } else {
      e.target.setAttribute(
        "class",
        "button is-primary is-one-fifth is-inline has-text-centered"
      );
    }
    console.log("e", e.target.className.includes("is-primary"));
  };
  return (
    <div className="intereses">
      <div className="columns is-mobile is-centered">
        <div className="column is-11">
          <h1 className="title">Selecciona tus intereses</h1>
          <h2 className="subtitle">
            Te mostraremos ofertas y descuentos según tus intereses
          </h2>
        </div>
      </div>
      <div className="columns is-mobile  is-centered">
        <div className="column">
          <button
            id="btn-fetch-data"
            className="button is-one-fifth is-inline has-text-centered"
            onClick={selectedButtonState}
          >
            Comida
          </button>
        </div>
        <div className="column">
          <button
            id="btn-fetch-data"
            className="button is-one-fifth is-inline has-text-centered"
            onClick={selectedButtonState}
          >
            Fitness
          </button>
        </div>
        <div className="column">
          <button
            id="btn-fetch-data"
            className="button is-one-fifth is-inline has-text-centered"
            onClick={selectedButtonState}
          >
            Educación
          </button>
        </div>
      </div>
      <div className="columns is-mobile  is-centered">
        <div className="column">
          <button
            id="btn-fetch-data"
            className="button is-one-fifth is-inline has-text-centered"
            onClick={selectedButtonState}
          >
            Salud y Bienestar
          </button>
        </div>
        <div className="column">
          <button
            id="btn-fetch-data"
            className="button is-one-fifth is-inline has-text-centered"
            onClick={selectedButtonState}
          >
            Asados
          </button>
        </div>
        <div className="column">
          <button
            id="btn-fetch-data"
            className="button is-one-fifth is-inline has-text-centered"
            onClick={selectedButtonState}
          >
            Viajes
          </button>
        </div>
      </div>
      <div className="columns is-mobile  is-centered">
        <div className="column">
          <div className="column">
            <button
              id="btn-fetch-data"
              className="button is-one-fifth is-inline has-text-centered"
              onClick={selectedButtonState}
            >
              Pleasure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingInteresesCard;

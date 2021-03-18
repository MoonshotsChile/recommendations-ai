import * as React from "react";
import DisponiblesCard from "../components/mision/Disponibles";
import EnCursoCard from "../components/mision/EnCurso";

import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";
import "../components/mision/Mision.scss";
import { misionSelected } from "../assets";
import {
  Benefit,
  benefitMock,
  benefitsDecorator,
} from "../domain/entity/Benefit";
import { useContext, useEffect, useRef, useState } from "react";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";

const MisionPage: React.FC = () => {
  const [likes, setLikes] = useState([benefitMock]);
  const [later, setLater] = useState([benefitMock]);
  const [tabDisponibleClassName, setTabDisponibleClassName] = useState(
    "is-active"
  );
  const [tabEnCursoClassName, setTabEnCursoClassName] = useState("");
  const [displayDisponibleClassName, setDisplayDisponibleClassName] = useState(
    ""
  );
  const [displayEnCursoClassName, setDisplayEnCursoClassName] = useState(
    "is-hidden"
  );
  const useCase = new BenefitsUseCase();

  useEffect(() => {
    useCase
      .random()
      .then((response: Response) => response.json())
      .then((data: Benefit[]) => {
        setLikes(benefitsDecorator(data));
      });
    useCase
      .random()
      .then((response: Response) => response.json())
      .then((data: Benefit[]) => {
        setLater(benefitsDecorator(data));
      });
  }, []);
  const disponible = () => {
    setTabDisponibleClassName("is-active");
    setTabEnCursoClassName("");
    setDisplayEnCursoClassName("is-hidden");
    setDisplayDisponibleClassName("");
  };
  const enCurso = () => {
    setTabDisponibleClassName("");
    setTabEnCursoClassName("is-active");
    setDisplayEnCursoClassName("");
    setDisplayDisponibleClassName("is-hidden");
  };

  return (
    <div>
      <Navbar selected={NAVBAR_ACTIONS.misions} />

      <div className="mision section">
        <div className="columns is-mobile">
          <div className="column">
            <span className="icon-text">
              <span className="icon">
                <img src={misionSelected} />
              </span>
              <span>Mis Misiones</span>
            </span>
          </div>
        </div>
        <div className="container">
          <div className="tabs is-toggle is-toggle-rounded">
            <ul>
              <li className={tabDisponibleClassName} onClick={disponible}>
                <a>
                  <span>Disponibles</span>
                </a>
              </li>
              <li className={tabEnCursoClassName} onClick={enCurso}>
                <a>
                  <span>En Curso</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={displayDisponibleClassName}>
        <div className="columns is-mobile">
          <div className="column is-12">
            <DisponiblesCard benefit={likes[0]} />
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-12">
            <DisponiblesCard benefit={likes[0]} />
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-12">
            <DisponiblesCard benefit={likes[0]} />
          </div>
        </div>
      </div>
      <div className={displayEnCursoClassName}>
        <div className="columns is-mobile">
          <div className="column is-12">
            <EnCursoCard benefit={later[0]} />
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-12">
            <EnCursoCard benefit={later[0]} />
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-12">
            <EnCursoCard benefit={later[0]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisionPage;

import * as React from "react";
import DisponiblesCard from "../components/mision/Disponibles";
import EnCursoCard from "../components/mision/EnCurso";

import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";
import "../components/mision/Mision.scss";
import { mision, misionSelected } from "../assets";
import { MisionsUseCase } from "../domain/MisionsUseCase";
import {
  Mision,
  misionMock,
  EnCurso,
  Disponible,
} from "../domain/entity/Mision";
import { useState, useEffect } from "react";

const MisionPage: React.FC = () => {
  const useCase = new MisionsUseCase();
  const [misions, setMisions] = useState(misionMock);

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

  useEffect(() => {
    useCase
      .list()
      .then((response: Response) => response.json())
      .then((data: Mision) => {
        console.log("data", data);
        setMisions(data);
      });
    console.log("misions dispo", misions);
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
        {misions.disponibles.map((disponible: Disponible, i: number) => (
          <div className="columns is-mobile" key={`disponibles-${i}`}>
            <div className="column is-12">
              <DisponiblesCard mision={disponible} />
            </div>
          </div>
        ))}
      </div>
      <div className={displayEnCursoClassName}>
        {misions.enCurso.map((enCurso: EnCurso, i: number) => (
          <div className="columns is-mobile" key={`enCurso-${i}`}>
            <div className="column is-12">
              <EnCursoCard mision={enCurso} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisionPage;

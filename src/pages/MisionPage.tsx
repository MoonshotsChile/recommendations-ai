import * as React from "react";
import DisponiblesCard from "../components/mision/Disponibles";
import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";
import "../components/mision/Mision.scss";
import { Benefit, benefitMock } from "../domain/entity/Benefit";
import { useContext, useEffect, useRef, useState } from "react";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";

const MisionPage: React.FC = () => {
  const [likes, setLikes] = useState([benefitMock]);
  const [later, setLater] = useState(benefitMock);
  const useCase = new BenefitsUseCase();

  useEffect(() => {
    useCase
      .random()
      .then((response: Response) => response.json())
      .then((data: Benefit[]) => {
        setLikes(data);
      });

    useCase
      .random()
      .then((response: Response) => response.json())
      .then((data: Benefit[]) => {
        setLater(data[0]);
      });
  }, []);
  return (
    <div>
      <Navbar selected={NAVBAR_ACTIONS.misions} />
      <div className="mision section">
        <div className="container">
          <div className="tabs is-toggle is-toggle-rounded">
            <ul>
              <li className="is-active">
                <a>
                  <span>Disponibles</span>
                </a>
              </li>
              <li>
                <a>
                  <span>En Curso</span>
                </a>
              </li>
            </ul>
          </div>
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
      <div className="columns is-mobile">
        <div className="column is-12">
          <DisponiblesCard benefit={likes[0]} />
        </div>
      </div>
    </div>
  );
};

export default MisionPage;

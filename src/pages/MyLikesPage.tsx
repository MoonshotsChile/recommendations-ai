import React, { useCallback, useContext, useEffect, useState } from "react";
import LikeCard from "../components/my-likes/Card";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";
import { Benefit, benefitMock } from "../domain/entity/Benefit";
import { clock, tinderButtonLikeIcon } from "../assets";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const MyLikesPage: React.FC = () => {
  const useCase = new BenefitsUseCase();
  const [likes, setLikes] = useState([benefitMock]);
  const [later, setLater] = useState(benefitMock);
  useEffect(() => {
    useCase
      .random()
      .then((response: Response) => response.json())
      .then((data: Benefit[]) => {
        setLikes(data);
      });

    console.log("likes", JSON.stringify(likes));

    useCase
      .random()
      .then((response: Response) => response.json())
      .then((data: Benefit[]) => {
        setLater(data[0]);
      });
  }, []);
  return (
    <section className="section">
      <div className="container">
        
          <div className="columns is-mobile">
            <div className="column">
              <span className="icon-text">
                <span className="icon">
                  <img src={tinderButtonLikeIcon} />
                </span>
                <span>Mis likes</span>
              </span>
            </div>
          </div>
          <div className="columns is-mobile">
            <Carousel>
              <div className="column is-6">
                <LikeCard benefit={likes[0]} />
              </div>
              <div className="column is-6">
                <LikeCard benefit={likes[0]} />
              </div>
              <div className="column is-6">
                <LikeCard benefit={likes[0]} />
              </div>
            </Carousel> 
          </div>
       
      </div>
      <div className="container">
        
          <div className="columns is-mobile">
          <div className="column is-12">
            <span className="icon-text">
              <span className="icon">
                <img src={clock} />
              </span>
              <span>En otro momento</span>
            </span>
          </div>
        </div>
          <div className="columns is-mobile">
            <Carousel>
              <div className="column is-6">
                <LikeCard benefit={later} />
              </div>
              <div className="column">
                <LikeCard benefit={later} />
              </div>
            </Carousel>
        </div>
        
      </div>
    </section>
  );
};

export default MyLikesPage;

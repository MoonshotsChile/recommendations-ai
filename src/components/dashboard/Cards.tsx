import React from "react";
import {
  likeSelected,
  home,
  later,
  deleteSelected,
  misionSelected,
} from "../../assets";

interface PropsCard {
  data: any;
}
const DashboardCards = (props: PropsCard): JSX.Element => {
  const data = props.data;
  return (
    <div className="columns  is-variable is-desktop">
      <div className="column">
        <div className="card has-background-primary is-lighter has-text-white">
          <div className="card-header">
            <div className="card-header-title has-text-white">
              <img className="img_card" src={home} /> #beneficios
            </div>
          </div>
          <div className="card-content">
            <p className="is-size-2">{data.totalBeneficios}</p>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="card has-background-categorias has-text-black">
          <div className="card-header">
            <div className="card-header-title has-text-white">
              <img className="img_card" src={home} /> #categorías
            </div>
          </div>
          <div className="card-content">
            <p className="is-size-2">{data.totalCategories}</p>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="card has-background-misiones has-text-white">
          <div className="card-header">
            <div className="card-header-title has-text-white">
              <img className="img_card" src={misionSelected} /> #misiones
            </div>
          </div>
          <div className="card-content">
            <p className="is-size-2">{data.totalMisiones}</p>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="card has-background-danger has-text-white">
          <div className="card-header">
            <div className="card-header-title has-text-white">
              <img className="img_card" src={likeSelected} />
              #total like
            </div>
          </div>
          <div className="card-content">
            <p className="is-size-2">{data.totalLikes}</p>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="card has-background-laters has-text-white">
          <div className="card-header">
            <div className="card-header-title has-text-white">
              <img className="img_card" src={later} /> #total later
            </div>
          </div>
          <div className="card-content">
            <p className="is-size-2">{data.totalLater}</p>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="card has-background-no-likes has-text-white">
          <div className="card-header">
            <div className="card-header-title has-text-white">
              <img className="img_card" src={deleteSelected} /> #total no-like
            </div>
          </div>
          <div className="card-content">
            <p className="is-size-2">{data.totalNoLikes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;

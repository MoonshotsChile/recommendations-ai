import * as React from "react";
import "./ButtonMenu.scss";
import { heartLike, tinder, marker, bell, user } from "../../assets";

const ButtonMenu: React.FC = () => {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">
              <div className="columns is-mobile">
                <div className="column">
                  <span className="icon">
                    <img src={tinder} />
                  </span>
                </div>
                <div className="column">
                  <span className="icon">
                    <img src={marker} />
                  </span>
                </div>
                <div className="column">
                  <span className="icon">
                    <img src={heartLike} />
                  </span>
                </div>
                <div className="column">
                  <span className="icon">
                    <img src={bell} />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </nav>
      <div className="navbar-divider" />
    </>
  );
};

export default ButtonMenu;

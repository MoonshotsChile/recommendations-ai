import React from "react";
import "./Dashboard.scss";
import { sbenefits } from "../../assets";
const Navbar = (): JSX.Element => {
  return (
    <div className="dashboard">
      <nav className="dashboard navbar is-fixed-top box-shadow-y">
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger toggler"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

          <a
            href="#"
            className="navbar-item has-text-weight-bold has-text-black"
          >
            <img className="img_card" src={sbenefits} />
          </a>
          <a
            role="button"
            className="navbar-burger nav-toggler"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu has-background-white">
          <div className="navbar-start">
            <a href="#" className="navbar-item is-active">
              <i className="fas fa-home icon"></i> Dashboard
            </a>
          </div>
          <div className="navbar-end">
            <a href="#" className="navbar-item">
              Alertas
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a href="#" className="navbar-link">
                Configuración
              </a>
              <div className="navbar-dropdown is-right">
                <a href="#" className="navbar-item">
                  Perfil
                </a>

                <hr className="navbar-divider" />
                <a href="#" className="navbar-item">
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

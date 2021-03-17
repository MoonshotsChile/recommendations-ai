import * as React from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import {
  bell,
  bellSelected,
  like,
  likeSelected,
  marker,
  markerSelected,
  tinder,
  tinderSelected,
  mision,
  misionSelected,
} from "../../assets";
import { NAVBAR_ACTIONS } from "../../context-api/ContextApi";
import "./Navbar.scss";

interface NavbarProps {
  selected: NAVBAR_ACTIONS;
}

const Navbar = (props: NavbarProps): JSX.Element => {
  let selected: NAVBAR_ACTIONS = props.selected;
  const history = useHistory();
  useEffect(() => {
    selected = props.selected;
  }, []);
  const go = (route: string) => {
    history.push(route);
  };

  return (
    <>
      <nav className="navbar-flex">
        <div className="navbar-flex--inner">
          <span className="icon" onClick={() => go("/offer")}>
            <img
              src={selected === NAVBAR_ACTIONS.matchs ? tinderSelected : tinder}
            />
          </span>
          <span className="icon" onClick={() => go("/mision")}>
            <img
              src={
                selected === NAVBAR_ACTIONS.misions ? misionSelected : mision
              }
            />
          </span>
          <span className="icon" onClick={() => go("/locations")}>
            <img
              src={
                selected === NAVBAR_ACTIONS.locations ? markerSelected : marker
              }
            />
          </span>
          <span className="icon" onClick={() => go("/my-likes")}>
            <img
              src={selected === NAVBAR_ACTIONS.likes ? likeSelected : like}
            />
          </span>
          <span className="icon" onClick={() => go("/benefits")}>
            <img
              src={
                selected === NAVBAR_ACTIONS.notifications ? bellSelected : bell
              }
            />
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

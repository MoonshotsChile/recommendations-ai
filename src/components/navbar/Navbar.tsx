import * as React from 'react';
import { useEffect } from 'react';
import { bell, heartLike, marker, tinder } from "../../assets";
import { NAVBAR_SELECTED } from "../../context-api/ContextApi";
import './Navbar.scss';

interface NavbarProps {
    selected: NAVBAR_SELECTED
}


const Navbar = (props: NavbarProps): JSX.Element => {
    let selected: NAVBAR_SELECTED = NAVBAR_SELECTED.matchs

    useEffect(() => {
        selected = props.selected
    }, []);

    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="#">
                            <div className="columns is-mobile">
                                <div className="column">
                                    <span className="icon">
                                        <img src={selected === NAVBAR_SELECTED.matchs ? tinder: tinder}/>
                                    </span>
                                </div>
                                <div className="column">
                                    <span className="icon">
                                        <img src={marker}/>
                                    </span>
                                </div>
                                <div className="column">
                                    <span className="icon">
                                        <img src={heartLike}/>
                                    </span>
                                </div>
                                <div className="column">
                                  <span className="icon">
                                        <img src={bell}/>
                                  </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </nav>
            <div className="navbar-divider"/>
        </>
    );
}

export default Navbar;

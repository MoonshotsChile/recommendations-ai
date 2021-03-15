import * as React from 'react';
import { useEffect } from 'react';
import { bell, heartLike, marker, tinder } from "../../assets";
import { NAVBAR_ACTIONS } from "../../context-api/ContextApi";
import './Navbar.scss';

interface NavbarProps {
    selected: NAVBAR_ACTIONS
}


const Navbar = (props: NavbarProps): JSX.Element => {
    let selected: NAVBAR_ACTIONS = NAVBAR_ACTIONS.matchs

    useEffect(() => {
        selected = props.selected
    }, []);

    return (
        <>
            <nav className="navbar-flex">
                <div className="navbar-flex--inner">
                    <span className="icon">
                        <img src={selected === NAVBAR_ACTIONS.matchs ? tinder: tinder}/>
                    </span>
                    <span className="icon">
                        <img src={marker}/>
                    </span>
                    <span className="icon">
                        <img src={heartLike}/>
                    </span>
                    <span className="icon">
                        <img src={bell}/>
                    </span>
                </div>
            </nav>
            <div className="navbar-divider"/>
        </>
    );
}

export default Navbar;

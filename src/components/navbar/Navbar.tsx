import * as React from 'react';
import './Navbar.scss';
import { sBankIcon } from "../../assets";

const Navbar = () => {

    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="#">
                            <img src={sBankIcon} alt="SBank"/>
                        </a>
                        <a className="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
                            <span aria-hidden="true"/>
                            <span aria-hidden="true"/>
                            <span aria-hidden="true"/>
                        </a>
                    </div>
                </div>
            </nav>
            <div className="navbar-divider"/>
        </>
    );
}

export default Navbar;

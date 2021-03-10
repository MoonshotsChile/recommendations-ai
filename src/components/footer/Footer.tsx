import * as React from 'react';
import './Footer.scss';
import { moonshotsLogoIcon } from "../../assets";

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="columns">
                        <div className="column is-fullwidth">
                            <figure className="image">
                                <img src={moonshotsLogoIcon} alt="Moonshots" className="moonshots-logo-icon"/>
                            </figure>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;

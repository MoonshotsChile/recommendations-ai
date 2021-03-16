import React from "react";
import { sbenefits, splash } from "../assets";

const SplashPage = (): JSX.Element => {
    return (
        <section className="hero splash is-fullheight is-fullwidth">
            <div className="hero-head">
                <caption className="image" style={{position: "absolute"}}>
                    <img src={splash} />
                </caption>
            </div>

            <div className="hero-body">
                <div className="container has-text-centered">
                    <p className="title">
                        <img src={sbenefits} alt="SBenefits"/>
                    </p>
                    <p className="subtitle">
                        By SBank
                    </p>
                </div>
            </div>

            <div className="hero-foot"/>
        </section>
    )
}

export default SplashPage

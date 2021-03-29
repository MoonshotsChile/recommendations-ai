import { splash } from "../../assets"
import React from "react"
import './Splash.scss'

interface SplashProps {
    onClick: (params?: any) => any|void
    img: string
}

const Splash = (props: SplashProps) => {
    return (
        <section className="hero splash is-fullheight is-fullwidth" onClick={props.onClick}>
            <div className="hero-head">
                <div className="image" style={{backgroundImage: `url(${splash})`, position: "absolute"}}/>
            </div>

            <div className="hero-body">
                <div className="container has-text-centered">
                    <p className="title">
                        <img src={props.img} alt="SBenefits"/>
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

export default Splash

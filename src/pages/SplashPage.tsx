import React, { useContext, useEffect } from "react";
import { sbenefitsWhite, splash } from "../assets";
import { useHistory } from "react-router-dom";
import { ContextApi } from "../context-api/ContextApi";

const SplashPage = (): JSX.Element => {

    const history = useHistory();
    const { saveContext } = useContext(ContextApi)

    useEffect(()=>{
        saveContext({isFullScreen: true})
    }, [])

    return (
        <section className="hero splash is-fullheight is-fullwidth" onClick={()=>history.push('/login')}>
            <div className="hero-head">
                <caption className="image" style={{backgroundImage: `url(${splash})`, position: "absolute"}}/>
            </div>

            <div className="hero-body">
                <div className="container has-text-centered">
                    <p className="title">
                        <img src={sbenefitsWhite} alt="SBenefits"/>
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

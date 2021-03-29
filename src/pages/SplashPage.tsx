import React from "react";
import { sbenefitsWhite } from "../assets";
import { useHistory } from "react-router-dom";
import Splash from "../components/splash/Splash";

const SplashPage = (): JSX.Element => {
    const history = useHistory();

    return (
        <Splash onClick={() => history.push('/login')} img={sbenefitsWhite}/>
    )
}

export default SplashPage

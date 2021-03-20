import React from "react";
import { ButtonProps } from "./ButtonProps";
import { tinderButtonLater, tinderButtonLaterDisabled } from "../../assets";

const TinderButtonLater = ({disabled = false, onClick}: ButtonProps) => {
    return (
        !disabled ?
            (<img src={tinderButtonLater} onClick={onClick} alt="later"/>) :
            (<img src={tinderButtonLaterDisabled} alt="later"/>)
    )
}

export default TinderButtonLater

import React from "react";
import { ButtonProps } from "./ButtonProps";
import { tinderButtonLater, tinderButtonLaterDisabled } from "../../assets";

const TinderButtonLater = ({disabled = false, onClick}: ButtonProps) => {
    return (
        !disabled ?
            (<img className="button-later" src={tinderButtonLater} onClick={onClick} alt="later"/>) :
            (<img className="button-later__disabled" src={tinderButtonLaterDisabled} alt="later"/>)
    )
}

export default TinderButtonLater

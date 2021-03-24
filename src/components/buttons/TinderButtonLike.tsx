import React from "react";
import { ButtonProps } from "./ButtonProps";
import { tinderButtonLike, tinderButtonLikeDisabled } from "../../assets";

const TinderButtonLike = ({disabled = false, onClick}: ButtonProps) => {
    return (
        !disabled ?
            (<img className="button-like" src={tinderButtonLike} onClick={onClick} alt="like"/>) :
            (<img className="button-like__disabled" src={tinderButtonLikeDisabled} alt="like"/>)
    )
}

export default TinderButtonLike

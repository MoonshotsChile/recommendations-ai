import React from "react";
import { ButtonProps } from "./ButtonProps";
import { tinderButtonLike, tinderButtonLikeDisabled } from "../../assets";

const TinderButtonLike = ({disabled = false, onClick}: ButtonProps) => {
    return (
        !disabled ?
            (<img src={tinderButtonLike} alt="like"/>) :
            (<img src={tinderButtonLikeDisabled} onClick={onClick} alt="like"/>)
    )
}

export default TinderButtonLike

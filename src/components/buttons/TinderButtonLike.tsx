import React from "react";
import { ButtonProps } from "./ButtonProps";
import { tinderButtonLike, tinderButtonLikeDisabled } from "../../assets";

const TinderButtonLike = ({disabled = false, onClick}: ButtonProps) => {
    return (
        !disabled ?
            (<img src={tinderButtonLike} onClick={onClick} alt="like"/>) :
            (<img src={tinderButtonLikeDisabled} alt="like"/>)
    )
}

export default TinderButtonLike

import React from "react";
import { ButtonProps } from "./ButtonProps";
import { tinderButtonNotLike, tinderButtonNotLikeDisabled } from "../../assets";

const TinderButtonNotLike = ({disabled = false, onClick}: ButtonProps) => {
    return (
        !disabled ?
            (<img src={tinderButtonNotLike} alt="not like"/>) :
            (<img src={tinderButtonNotLikeDisabled} onClick={onClick} alt="not like"/>)
    )
}

export default TinderButtonNotLike

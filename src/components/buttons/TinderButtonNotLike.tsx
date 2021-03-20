import React from "react";
import { ButtonProps } from "./ButtonProps";
import { tinderButtonNotLike, tinderButtonNotLikeDisabled } from "../../assets";

const TinderButtonNotLike = ({disabled = false, onClick}: ButtonProps) => {
    return (
        !disabled ?
            (<img src={tinderButtonNotLike} onClick={onClick} alt="not like"/>) :
            (<img src={tinderButtonNotLikeDisabled} alt="not like"/>)
    )
}

export default TinderButtonNotLike

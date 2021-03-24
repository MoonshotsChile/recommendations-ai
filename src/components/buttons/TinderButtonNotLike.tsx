import React from "react";
import { ButtonProps } from "./ButtonProps";
import { tinderButtonNotLike, tinderButtonNotLikeDisabled } from "../../assets";

const TinderButtonNotLike = ({disabled = false, onClick}: ButtonProps) => {
    return (
        !disabled ?
            (<img className="button-not-like" src={tinderButtonNotLike} onClick={onClick} alt="not like"/>) :
            (<img className="button-not-like__disabled" src={tinderButtonNotLikeDisabled} alt="not like"/>)
    )
}

export default TinderButtonNotLike

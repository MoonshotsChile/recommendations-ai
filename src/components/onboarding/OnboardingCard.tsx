import React, { FC } from "react";
import "./OnboardingCard.scss";

interface PropsCard {
  onboarding: string;
}
const OnboardingCard = (props: PropsCard): JSX.Element => {
  const onboarding = props.onboarding;
  return <img className="" src={onboarding} alt="Placeholder image" />;
};

export default OnboardingCard;

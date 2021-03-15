import * as React from "react";
import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";
const BenefitsMap: React.FC = () => {
  return (
    <div className="section">
      <Navbar selected={NAVBAR_ACTIONS.notifications} />
      <div className="container">BenefitsMap</div>
    </div>
  );
};

export default BenefitsMap;

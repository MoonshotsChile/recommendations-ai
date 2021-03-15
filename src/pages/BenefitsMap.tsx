import * as React from "react";
import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";
const BenefitsMap: React.FC = () => {
  return (
    <div>
      <Navbar selected={NAVBAR_ACTIONS.notifications} />
      <div className="section">
        <div className="container">BenefitsMap</div>
      </div>
    </div>
  );
};

export default BenefitsMap;

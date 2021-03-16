import * as React from "react";
import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";

const MisionPage: React.FC = () => {
  return (
    <div>
      <Navbar selected={NAVBAR_ACTIONS.misions} />
      <div className="section">
        <div className="container">Mision</div>
      </div>
    </div>
  );
};

export default MisionPage;

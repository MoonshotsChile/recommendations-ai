import * as React from "react";
import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";

const UbicationPage: React.FC = () => {
  return (
    <div>
      <Navbar selected={NAVBAR_ACTIONS.locations} />
      <div className="section">
        <div className="container">Ubications</div>
      </div>
    </div>
  );
};

export default UbicationPage;

import * as React from "react";
import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";

const UbicationPage: React.FC = () => {
  return (
    <div className="section">
      <Navbar selected={NAVBAR_ACTIONS.locations} />
      <div className="container">UbicationPage</div>
    </div>
  );
};

export default UbicationPage;

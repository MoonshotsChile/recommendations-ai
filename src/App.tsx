import React, { FC, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import LandingPage from "./pages/LandingPage";
import BenefitsMapPage from "./pages/BenefitsMap";
import InterestsPage from "./pages/InterestsPage";
import LoginPage from "./pages/LoginPage";
import MyLikesPage from "./pages/MyLikesPage";
import OfferPage from "./pages/OfferPage";
import TutorialPage from "./pages/TutorialPage";
import UbicationPage from "./pages/UbicationPage";
import OnboardingPage from "./pages/OnboardingPage";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { ContextApi, ContextApiProvider } from "./context-api/ContextApi";

const App: FC = () => {
  const { isAuthenticated } = useContext(ContextApi);

  return (
    <ContextApiProvider>
      <div className="container">
        <Router basename="">
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/">
              {isAuthenticated ? <LandingPage /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/benefits">
              {isAuthenticated ? <BenefitsMapPage /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/interests">
              {isAuthenticated ? <InterestsPage /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/my-likes">
              {isAuthenticated ? <MyLikesPage /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/offer">
              {isAuthenticated ? <OfferPage /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/tutorial">
              {isAuthenticated ? <TutorialPage /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/ubication">
              {isAuthenticated ? <UbicationPage /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/onboarding">
              {isAuthenticated ? <OnboardingPage /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </Router>
        <Footer />
      </div>
    </ContextApiProvider>
  );
};

export default App;

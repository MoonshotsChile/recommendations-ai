import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import BenefitsMapPage from "./pages/BenefitsMap";
import InterestsPage from "./pages/InterestsPage";
import LoginPage from "./pages/LoginPage";
import MyLikesPage from "./pages/MyLikesPage";
import OfferPage from "./pages/OfferPage";
import TutorialPage from "./pages/TutorialPage";
import LocationsPage from "./pages/LocationsPage";
import OnboardingPage from "./pages/OnboardingPage";
import MisionPage from "./pages/MisionPage";
import NotificationPage from "./pages/NotificationPage";
import { ContextApiProvider } from "./context-api/ContextApi";
import SplashPage from "./pages/SplashPage";

const App: FC = () => {
  return (
    <ContextApiProvider>
      <div className="container is-fullwidth">
        <Router basename="">
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/">
              <SplashPage />
            </Route>
            <Route exact path="/benefits">
              <BenefitsMapPage />
            </Route>
            <Route exact path="/interests">
              <InterestsPage />
            </Route>
            <Route exact path="/my-likes">
              <MyLikesPage />
            </Route>
            <Route exact path="/offer">
              <OfferPage />
            </Route>
            <Route exact path="/tutorial">
              <TutorialPage />
            </Route>
            <Route exact path="/locations">
              <LocationsPage />
            </Route>
            <Route exact path="/onboarding">
              <OnboardingPage />
            </Route>
            <Route exact path="/mision">
              <MisionPage />
            </Route>
            <Route exact path="/notifications">
              <NotificationPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </ContextApiProvider>
  );
};

export default App;

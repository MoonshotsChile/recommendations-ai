import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
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
import TagManager, { TagManagerArgs } from 'react-gtm-module';

const tagManagerArgs: TagManagerArgs = {
  gtmId: 'GTM-WFRKBX5'
}

TagManager.initialize(tagManagerArgs)

const App: FC = () => {
  return (
    <ContextApiProvider>
        <Router basename="">
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/">
              <SplashPage />
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
    </ContextApiProvider>
  );
};

export default App;

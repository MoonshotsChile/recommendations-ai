import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss';
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
import { ContextApiProvider } from './context-api/ContextApi';

const App: React.FC = () => {
    return (
        <ContextApiProvider>
            <div className="container">
                <Navbar/>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <LandingPage/>
                        </Route>
                        <Route exact path="/benefits">
                            <BenefitsMapPage/>
                        </Route>
                        <Route exact path="/interests">
                            <InterestsPage/>
                        </Route>
                        <Route exact path="/login">
                            <LoginPage/>
                        </Route>
                        <Route exact path="/my-likes">
                            <MyLikesPage/>
                        </Route>
                        <Route exact path="/offer">
                            <OfferPage/>
                        </Route>
                        <Route exact path="/tutorial">
                            <TutorialPage/>
                        </Route>
                        <Route exact path="/ubication">
                            <UbicationPage/>
                        </Route>
                        <Route exact path="/onboarding">
                            <OnboardingPage/>
                        </Route>
                    </Switch>
                </Router>
                <Footer/>
            </div>
        </ContextApiProvider>
    );
}

export default App;

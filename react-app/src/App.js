import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ManageReviewsPage from "./components/Reviews/ManageReview";
import UpdateSpotForm from "./components/Spots/UpdateSpot";
import ManageSpotsPage from "./components/Spots/ManageSpots";
import SpotDetailsPage from "./components/Spots/SpotDetails";
import CreateSpotForm from "./components/Spots/CreateSpot";
import LandingPage from "./components/LandingPage";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import ExplorePage from "./components/ExplorePage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import './App.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation isLoaded={isLoaded} />
      <div className="bodyContent">
        {isLoaded && (
          <Switch>
            <Route exact path="/" >
              <LandingPage />
            </Route>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/explore" >
              <ExplorePage />
            </Route>
            <Route path='/reviews/created'>
              <ManageReviewsPage />
            </Route>
            <Route path='/spots/new'>
              <CreateSpotForm />
            </Route>
            <Route path='/spots/created'>
              <ManageSpotsPage />
            </Route>
            <Route path='/spots/:id/edit'>
              <UpdateSpotForm />
            </Route>
            <Route exact path='/spots/:id'>
              <SpotDetailsPage />
            </Route>
          </Switch>
        )}
      </div>
      <Footer isLoaded={isLoaded} />
    </div>
  );
}

export default App;

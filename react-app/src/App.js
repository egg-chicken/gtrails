import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ManageReviewsPage from "./components/Reviews/ManageReview";
import UpdateLocationForm from "./components/Locations/UpdateLocation";
import ManageLocationsPage from "./components/Locations/ManageLocations";
import LocationDetailsPage from "./components/Locations/LocationDetails";
import CreateLocationForm from "./components/Locations/CreateLocation";
import LandingPage from "./components/LandingPage";
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
            <Route path="/explore" >
              <ExplorePage />
            </Route>
            <Route path='/reviews/created'>
              <ManageReviewsPage />
            </Route>
            <Route path='/locations/new'>
              <CreateLocationForm />
            </Route>
            <Route path='/locations/created'>
              <ManageLocationsPage />
            </Route>
            <Route path='/locations/:id/edit'>
              <UpdateLocationForm />
            </Route>
            <Route exact path='/locations/:id'>
              <LocationDetailsPage />
            </Route>
          </Switch>
        )}
      </div>
      <Footer isLoaded={isLoaded} />
    </div>
  );
}

export default App;

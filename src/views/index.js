import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { DataProvider } from "../contexts/DataContext";

// Views
import Landing from "./landing";

import RecipientHome from "./recipient";
import RecipientSignup from "./recipient/signup";
import MakeAppointment from "./recipient/MakeAppointment";
import ViewRecipientAppointments from "./recipient/ViewAppointments";

import ProviderHome from "./provider";
import ProviderSignup from "./provider/signup";
import ProviderProfile from "./provider/profile";
import ViewAppointmentRequests from './provider/ViewAppointmentRequests';
import ViewProviderAppointments from './provider/ViewAppointments'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: process.env.NODE_ENV === "production" ? false : true
    };
  }

  onLogin = async login => {
    login()
      .then(data => {
        this.setState({
          loggedIn: true
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    // if (this.state.loggedIn) {
    return (
      <Router>
        <DataProvider>
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => <Landing {...routeProps} />}
            />
            <Route
              exact
              path="/recipient/home"
              render={routeProps => <RecipientHome {...routeProps} />}
            />
            <Route
              exact
              path="/recipient/signup"
              render={routeProps => <RecipientSignup {...routeProps} />}
            />
            <Route
              exact
              path="/recipient/make-appointment"
              render={routeProps => <MakeAppointment {...routeProps} />}
            />
            <Route
              exact
              path="/recipient/view-appointments"
              render={routeProps => (
                <ViewRecipientAppointments {...routeProps} />
              )}
            />
            <Route
              exact
              path="/provider/home"
              render={routeProps => <ProviderHome {...routeProps} />}
            />
            <Route
              exact
              path="/provider/signup"
              render={routeProps => <ProviderSignup {...routeProps} />}
            />
            <Route
              exact
              path="/provider/profile"
              render={routeProps => <ProviderProfile {...routeProps} />}
            />
            <Route
              exact
              path="/provider/view-requests"
              render={routeProps => <ViewAppointmentRequests {...routeProps} />}
            />
            <Route
              exact
              path="/provider/view-appointments"
              render={routeProps => <ViewProviderAppointments {...routeProps} />}
            />
            {/* <Redirect to="/" /> */}
          </Switch>
        </DataProvider>
      </Router>
    );
    // }
  }
}

export default App;

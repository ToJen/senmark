import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Views
import Landing from "./landing";
import RecipientHome from './recipient';
import RecipientSignup from './recipient/signup';
import ProviderHome from './provider';
import ProviderSignup from './provider/signup';

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
                    path="/provider/home"
                    render={routeProps => <ProviderHome {...routeProps} />}
                  />
                  <Route
                    exact
                    path="/provider/signup"
                    render={routeProps => <ProviderSignup {...routeProps} />}
                  />
                  {/* <Redirect to="/" /> */}
                </Switch>
          </Router>
      );
    // }
  }
}

export default App;

import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Views
import Landing from "./landing";

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
    if (this.state.loggedIn) {
      return (
          <Router>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={routeProps => <Landing {...routeProps} />}
                  />
                  <Redirect to="/" />
                </Switch>
          </Router>
      );
    }
  }
}

export default App;

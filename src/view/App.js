import React from 'react';
import {Router, Route, Switch, useLocation, withRouter, BrowserRouter} from "react-router-dom";
import Login from "./Login"
import HomePage from "./HomePage"

function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={props => <HomePage {...props} />} />
          <Route path="/login" component={props => <Login {...Login} />} />
          <Route path="/" component={props => <HomePage {...props} />} />
         </Switch>
      </BrowserRouter>
    );
  };

  export default withRouter(App);


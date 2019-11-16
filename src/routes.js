import React from "react";
import { isAuthenticated } from "./auth";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Login"
import Register from "./pages/RegisterPage"



const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/registeruser" component={Register} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

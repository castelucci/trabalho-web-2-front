import React from "react";

import { BrowserRouter, Route} from "react-router-dom";

import Login from "./pages/Login"
import Register from "./pages/RegisterPage"
import Home from "./pages/Home"
import Navbar from "components/Navbars/IndexNavbar.jsx";




const Routes = () => (
  <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Navbar/>
      <Route exact path="/home" component={Home} />
      <Route path="/registeruser" component={Register} />
  </BrowserRouter>
);

export default Routes;

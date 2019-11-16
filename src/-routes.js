import React from "react"

import {estaAutenticado} from "./auth"

import {BrowserRouter, Route,Switch, Redirect} from "react-router-dom"

 import Login from "./pages/Login"
 import Register from "./pages/RegisterPage"

const PrivateRoute = ({component:Component, ...rest }) => (<Route {...rest} 
    render={props => estaAutenticado() ? ( <Component {...props}/> 
      ) : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
    }
  />
)

const estaAU = async ()=>{
  console.log(await estaAutenticado());
  
  return await estaAutenticado()}


const Routes = () =>(
  <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Login}/>
        <PrivateRoute  path="/user" component={Register}/>
    </Switch>
  </BrowserRouter>
)

export default Routes
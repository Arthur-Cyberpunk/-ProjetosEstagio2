import React from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Provider from './components/Store/Provider'
import RoutePrivate from './components/RoutePrivate/Private/Private'

function Routes() {
  return (
    <BrowserRouter >
    <Provider>

        <RoutePrivate path="/users" exact component={Users} />
        <RoutePrivate path="/register" exact component={Register} />
        <RoutePrivate path="/register/:id" exact component={Register} />
        <Route path="/" exact component={Login} />

        </Provider>
     </BrowserRouter>
  );
}

export default Routes;

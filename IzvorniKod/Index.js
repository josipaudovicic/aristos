import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "./registracija/Registration";
import Poruka from "./registracija/Poruka";

function Index() {

    return(
        <Router>
            <Switch>
                <Route path="/registracija" component={Registration} />
                <Route path="/poruka" component={Poruka} />
            </Switch>
        </Router>
    );
}

export default Index; 
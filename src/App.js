import React, { Component } from 'react';

import {
    Route,
    Switch,
    withRouter
} from "react-router-dom"

import Index from "./pages/Index";
import HoneyHarvest from "./pages/HoneyHarvest";
import HoneySale from "./pages/HoneySale";
import HoneySelectPage from "./pages/HoneySelectPage";
import Wiki from "./pages/Wiki";
import MyFarms from "./pages/MyFarms";
import BeeFarm from "./pages/BeeFarm";
import Login from "./pages/Login";
import Preferences from "./pages/Preferences";
import PollenHarvest from "./pages/PollenHarvest";
import ControlHarvest from "./pages/ControlHarvest";


class App extends Component {
    render() {
        const { history } = this.props

        return (
            <div className="App">
                <Switch>
                    <Route history={history} exact path='/' component={Index} />
                    <Route history={history} exact path='/login' component={Login} />
                    <Route history={history} exact path='/bee_farm' component={BeeFarm} />
                    <Route history={history} exact path='/honey_harvest' component={HoneyHarvest} />
                    <Route history={history} exact path='/honey_sale' component={HoneySale} />
                    <Route history={history} exact path='/control_harvest' component={ControlHarvest} />
                    <Route history={history} exact path='/pollen_harvest' component={PollenHarvest} />
                    <Route history={history} exact path='/honey_select' component={HoneySelectPage} />
                    <Route history={history} exact path='/my_farms' component={MyFarms} />
                    <Route history={history} exact path='/preferences' component={Preferences} />
                    <Route history={history} exact path='/wiki' component={Wiki} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App)

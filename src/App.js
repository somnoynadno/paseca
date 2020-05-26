import React, { Component } from 'react';

import {
    Route,
    Switch,
    withRouter
} from "react-router-dom"

import IndexPage from "./pages/IndexPage";
import HoneyHarvestPage from "./pages/HoneyHarvestPage";
import HoneySalePage from "./pages/HoneySalePage";
import HoneySelectPagePage from "./pages/HoneySelectPagePage";
import WikiIndexPage from "./pages/WikiIndexPage";
import MyFarmsPage from "./pages/MyFarmsPage";
import BeeFarmPage from "./pages/BeeFarmPage";
import LoginPage from "./pages/LoginPage";
import PreferencesPage from "./pages/PreferencesPage";
import PollenHarvestPage from "./pages/PollenHarvestPage";
import ControlHarvestPage from "./pages/ControlHarvestPage";


class App extends Component {
    render() {
        const { history } = this.props

        return (
            <div className="App">
                <Switch>
                    <Route history={history} exact path='/' component={IndexPage} />
                    <Route history={history} exact path='/login' component={LoginPage} />
                    <Route history={history} exact path='/bee_farm' component={BeeFarmPage} />
                    <Route history={history} exact path='/honey_harvest' component={HoneyHarvestPage} />
                    <Route history={history} exact path='/honey_sale' component={HoneySalePage} />
                    <Route history={history} exact path='/control_harvest' component={ControlHarvestPage} />
                    <Route history={history} exact path='/pollen_harvest' component={PollenHarvestPage} />
                    <Route history={history} exact path='/honey_select' component={HoneySelectPagePage} />
                    <Route history={history} exact path='/my_farms' component={MyFarmsPage} />
                    <Route history={history} exact path='/preferences' component={PreferencesPage} />
                    <Route history={history} exact path='/wiki' component={WikiIndexPage} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App)

import React, { Component } from 'react';

import {
    Route,
    Switch,
    withRouter
} from "react-router-dom"

import IndexPage from "./pages/other/IndexPage";
import HoneyHarvestPage from "./pages/harvests/HoneyHarvestPage";
import HoneySalePage from "./pages/harvests/HoneySalePage";
import HarvestsSelectPage from "./pages/harvests/HarvestsSelectPage";
import WikiIndexPage from "./pages/wiki/WikiIndexPage";
import MyFarmsPage from "./pages/bee_farm/MyFarmsPage";
import BeeFarmPage from "./pages/bee_farm/BeeFarmPage";
import LoginPage from "./pages/auth/LoginPage";
import PreferencesPage from "./pages/lk/PreferencesPage";
import PollenHarvestPage from "./pages/harvests/PollenHarvestPage";
import ControlHarvestPage from "./pages/harvests/ControlHarvestPage";
import ErrorPage from "./pages/other/ErrorPage";
import WinterIndexPage from "./pages/winter/WinterIndexPage";
import SubscriptionsPage from "./pages/lk/SubscriptionsPage";
import HelpPage from "./pages/lk/HelpPage";


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
                    <Route history={history} exact path='/honey_select' component={HarvestsSelectPage} />
                    <Route history={history} exact path='/my_farms' component={MyFarmsPage} />
                    <Route history={history} exact path='/preferences' component={PreferencesPage} />
                    <Route history={history} exact path='/wiki' component={WikiIndexPage} />
                    <Route history={history} exact path='/winter' component={WinterIndexPage} />
                    <Route history={history} exact path='/subscriptions' component={SubscriptionsPage} />
                    <Route history={history} exact path='/help' component={HelpPage} />
                    <Route history={history} exact path='/error' component={ErrorPage} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App)

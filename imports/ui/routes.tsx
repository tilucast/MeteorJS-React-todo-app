import React from 'react'
import {Route, Switch, Router} from 'react-router'
import {createBrowserHistory} from 'history'

import CreateAccount from './CreateAccount'
import { LandingPage } from './LandingPage'

const browser = createBrowserHistory()

export default function Routes (){
    return (
        <Router history={browser}>
            <Switch>
                <Route path="/" component={CreateAccount}  exact/>
                <Route path="/landing" component={LandingPage}/>
            </Switch>
        </Router>
    )
} 
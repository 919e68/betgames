import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Main from './components/main'
import BetOnPoker from './components/pages/bet-on-poker'
import Baccarat from './components/pages/baccarat'
import WarOfBets from './components/pages/war-of-bets'

ReactDOM.render((
  <Router>
    <Switch>
      <Route exact path='/' component={Main} />
      <Route exact path='/bet-on-poker' component={BetOnPoker}/>
      <Route exact path='/baccarat' component={Baccarat}/>
      <Route exact path='/war-of-bets' component={WarOfBets}/>
    </Switch>
  </Router>
), document.getElementById('app'))

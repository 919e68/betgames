import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Main from './components/main'
import Watch from './components/pages/watch'
import BetOnPoker from './components/pages/bet-on-poker'
import Baccarat from './components/pages/baccarat'
import Results from './components/pages/results'
import WarOfBets from './components/pages/war-of-bets'
import BetHistory from './components/pages/bet-history'

ReactDOM.render((
  <Router>
    <Switch>
      <Route exact path='/' component={Main} />
      <Route path='/poker' component={BetOnPoker}/>
      <Route path='/baccarat' component={Baccarat}/>
      <Route path='/war' component={WarOfBets}/>
      <Route path='/history' component={BetHistory}/>
      <Route path='/watch/:game/:date/:drawNumber' component={Watch} />
      <Route path='/results' component={Results}/>
    </Switch>
  </Router>
), document.getElementById('app'))

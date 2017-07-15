import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'

import Translate from '../../../libs/translate'

export default class Navbar extends Component {
  render() {
    return (
      <nav className="top-navigation">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="sr-only">MENU</span>
          <span className="icon-box">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </span>
        </button>

        <a className="visible-xs-inline" target="_parent" href="https://betgames.tv">
          <img className="home" src="https://betgames9.betgames.tv/design/iframe/images/home.svg" />
        </a>
      
        <div className="navbar-collapse collapse">
          <ul className="nav nav-pills">

            <li className="bets">
              <Link to="/history">Bet History</Link>
              <span></span>
            </li>

            <li className="bets">
              <Link to="/results">Results</Link>
              <span></span>
            </li>

          </ul>
        </div>
        {
          this.props.user && typeof this.props.user.currentBalance == 'number' ?
            <div className="well well-sm balance-block">
              Balance: 
              <span className="badge" id="balance">${this.props.user.currentBalance.toFixed(2)}</span>
            </div>
            :
            null
        }
      </nav>
    )
  }

}


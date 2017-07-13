import React, { Component } from 'react'
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
            <li className="how_to_play">
              <a href="https://betgames9.betgames.tv/ext/game/how_to_play/testpartner">How to play?</a>
              <span></span>
            </li>
            <li className="dealers">
              <a href="https://betgames9.betgames.tv/ext/game/dealers/testpartner">Our dealers</a>
              <span></span>
            </li>
            <li className="bets">
              <a href="https://betgames9.betgames.tv/ext/game/bets/testpartner">Bet History</a>
              <span></span>
            </li>
            <li className="results">
              <a href="https://betgames9.betgames.tv/ext/game/results/testpartner">Results</a>
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


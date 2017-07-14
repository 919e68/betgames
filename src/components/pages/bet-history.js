import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import Translate from '../../../libs/translate'
import Api from '../../api'
import Navbar from '../elements/navbar'
import GameMenu from '../blocks/game-menu'

export default class BetHistory extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <GameMenu />

        <div className="container">
          <div id="table">
            <header>
                <h5>2017-07-14 00:00 - 2017-07-15 00:00 (GMT +0)</h5>
            </header>
            <table className="table table-striped bets rt-responsive-table-0 rt-responsive-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Game</th>
                    <th>DRAW</th>
                    <th>Bet</th>
                    <th>Odd</th>
                    <th className="result-column">RESULT</th>
                    <th>Amount</th>
                    <th>Won</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

}
import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import Translate from '../../../libs/translate'
import Api from '../../api'
import Navbar from '../elements/navbar'
import GameMenu from '../blocks/game-menu'
import moment from 'moment'

export default class BetHistory extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bets: []
    }
  }

  componentWillMount() {
    Api.users.betHistory(1).then(response => {
      console.log(response)
      this.setState({bets: [].concat(response.data.data.user.bets)})
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <GameMenu />

        <div className="container">
          <div id="table">
            <header>
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
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.bets.map( (bet, index) => {
                      return (
                        <tr key={index}>
                          <td>{moment(bet.updatedAt).format('YYYY-MM-DD hh:mm:ss')}</td>
                          <td>{bet.draw.game.name}</td>
                          <td>{bet.draw.drawNumber} </td>
                          <td>{bet.odd.outcome.name}</td>
                          <td>{bet.odd.odds.toFixed(2)}</td>
                          <td>{bet.odd.isWinner ? 'Won' : 'Lost'}</td>
                          <td>
                            ${bet.amount.toFixed(2)}
                          </td>
                          <td><Link to={`/watch/${bet.draw.game.name}/${bet.draw.drawNumber}`} >Watch</Link></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
            </table>
          </div>
        </div>
      </div>

    )
  }

}
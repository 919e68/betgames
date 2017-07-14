import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import Translate from '../../../libs/translate'
import Api from '../../api'
import Navbar from '../elements/navbar'
import GameMenu from '../blocks/game-menu'
import moment from 'moment'
import { Button } from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker'

export default class Results extends Component {

  constructor(props) {
    super(props)

    this.state = {
      draws: [],
      game: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    Api.draws.get().then(response => {
      console.log(response)
      this.setState({draws: [].concat(response.data.data.draws)})
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    
    let date = moment(this.refs.date.getValue()).format('YYYY-MM-DD')
    let gameId = this.state.game
    let drawNumber = this.refs.drawNumber.value

    Api.draws.get(gameId, drawNumber).then(response => {
      console.log(response)
      this.setState({draws: [].concat(response.data.data.draws)})
    })

  }

  handleChange(e) {
    this.setState({game: e.target.value})
  }

  render() {

    return (
      <div>
        <Navbar />
        <GameMenu />
        
        <div className="container">
          <section className="filter" style={{paddingTop: 20, paddingBottom: 20}}>
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <DatePicker ref="date" />
              <div className="form-group">
                <select id="current_game" className="form-control" value={this.state.game} onChange={this.handleChange}>
                  <option value="0">All games</option>
                  <option value="1">Bet On Poker</option>
                  <option value="2">Baccarat</option>
                  <option value="3">War of Bets</option>
                </select> 
              </div>
              <div className="form-group">
                <input ref="drawNumber" type="text" id="code" maxLength="11" placeholder="Draw no." className="form-control" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn filter-button">Filter</button>
              </div>
            </form>
          </section>
          <div id="table">
            <header>
          
            </header>
            <table className="table table-striped bets rt-responsive-table-0 rt-responsive-table">
                <thead>
                  <tr>
                    <th>Draw</th>
                    <th>Game</th>
                    <th>Result</th>
                    <th>Watch</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.draws.map((draw, index) => {
                      return (
                        <tr key={index}>
                          <td>{draw.drawNumber} </td>
                          <td>{draw.game.name}</td>
                          <td>{draw.winnerFormatted}&nbsp;
                          {
                            draw.winningCards.map((card, index) => {
                              return (
                                <span className={`card ${card.symbol}`} key={`card-${index}`}>{card.rank}<span className={card.symbol}></span></span>
                              )
                            })
                          }
                          </td>
                          <td><Link to={`/watch/${draw.game.name}/${draw.drawNumber}`} >Watch</Link></td>
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
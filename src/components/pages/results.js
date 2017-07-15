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
      game: 0,
      date: moment().format('YYYY-MM-DD')
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    Api.draws.get().then(response => {
      console.log(response)
      this.setState({draws: [].concat(response.data.data.draws.data)})
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    
    let date = this.refs.date.getValue() ? moment(this.refs.date.getValue()).format('YYYY-MM-DD') : null
    let gameId = this.state.game
    let drawNumber = this.refs.drawNumber.value

    Api.draws.get(gameId, drawNumber, date).then(response => {
      console.log(response)
      this.setState({draws: [].concat(response.data.data.draws.data)})
    }).catch(err => {
      console.log(err)
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
          <section className="filter" style={{paddingTop: 40, paddingBottom: 20}}>
            <form className="form-inline" onSubmit={this.handleSubmit} style={{paddingBottom:20}}>
              <DatePicker ref="date" value={this.state.date} onChange={(e) => {
                console.log(e)
                this.setState({date: moment(e).format('YYYY-MM-DD')})
              }} />
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

            {moment(this.state.date).format('YYYY-MM-DD') } 00:00 - {moment(this.state.date).add('days', 1).format('YYYY-MM-DD')} 00:00
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
                          <td>{moment(draw.createdAt).format('hh:mm:ss')} - {draw.drawNumber} </td>
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
                          <td><Link to={`/watch/${draw.game.name}/${moment(draw.updatedAt).format('YYMMDD')}/${draw.drawNumber}`} >Watch</Link></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
            </table>
          </div>

          <div style={{textAlign: 'center'}}>
            <ul className="pagination">
              <li><a href="#">1</a></li>
              <li className="active"><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
            </ul>
          </div>
        </div>

      </div>

    )
  }

}
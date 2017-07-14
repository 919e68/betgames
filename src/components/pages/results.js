import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import Translate from '../../../libs/translate'
import Api from '../../api'
import Navbar from '../elements/navbar'
import GameMenu from '../blocks/game-menu'
import moment from 'moment'

export default class Results extends Component {

  constructor(props) {
    super(props)

    this.state = {
      draws: []
    }
  }

  componentWillMount() {
    Api.draws.get().then(response => {
      console.log(response)
      this.setState({draws: [].concat(response.data.data.draws)})
    })
  }

  render() {

    return (
      <div>
        <Navbar />
        <GameMenu />
        
        <div className="container">
          <section className="filter">
            <form className="form-inline">
              <div className="form-group">
                <div className="input-group date" id="datepicker">
                  <input type="text" className="form-control"/>
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-calendar"></span>
                  </span>
                </div>
              </div>
              <div className="form-group">
                <select id="current_game" className="form-control">
                  <option value="0">All games</option>
                  <option value="5">Bet On Poker</option>
                  <option value="6">Baccarat</option>
                  <option value="8">War of Bets</option>
                </select> 
              </div>
              <div className="form-group">
                <input type="text" id="code" maxLength="11" placeholder="Draw no." className="form-control" />
              </div>
              <div className="form-group">
                <button type="button" className="btn filter-button">Filter</button>
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
                    this.state.draws.map( (draw, index) => {
                      return (
                        <tr key={index}>
                          <td>{draw.drawNumber} </td>
                          <td>{draw.game.name}</td>
                          <td>{draw.winnerFormatted}</td>
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
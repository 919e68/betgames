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
                          <td>{draw.winner}</td>
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
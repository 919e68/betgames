import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import Translate from '../../../libs/translate'
import Api from '../../api'
import Navbar from '../elements/navbar'
import GameMenu from '../blocks/game-menu'
import moment from 'moment'

export default class Watch extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    console.log(this)
    let game = ''
    switch(this.props.match.params.game.toLowerCase()) {
      case 'war of bets':
        game = 'war'
        break
      case 'baccarat':
        game = 'baccarrat'
        break
      case 'bet on poker':
        game = 'poker'
        break
    }
    return (
      <div>
        <Navbar />
        <GameMenu />

        <div className="container" style={{paddingTop: 40, textAlign: 'center'}}>
          <video src={`https://video.betgames.tv/stream${game}/170714/${this.props.match.params.drawNumber}.mp4`} className="fp-engine " autoPlay="true" preload="true" ></video>
          <br />
          <Link to="/results">Back to Results </Link>
        </div>
      </div>

    )
  }

}
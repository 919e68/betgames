import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import Translate from '../../../libs/translate'
import Api from '../../api'
import Navbar from '../elements/navbar'
import GameMenu from '../blocks/game-menu'
import moment from 'moment'
import Waiting from '../elements/waiting'

export default class Watch extends Component {

  constructor(props) {
    super(props)

    this.state = {
      draw: {}
    }
  }

  componentWillMount() {
    
    Api.draws.getOne(this.props.match.params.drawNumber).then(response => {
      this.setState({ draw: Object.assign({}, response.data.data.draw.data) })
    })
  }

  renderWinningCards() {
    if(this.state.draw.winningCards) {
      return this.state.draw.winningCards.map((card, index) => {
        return (
          <span className={`card ${card.symbol}`} key={`card-${index}`}>{card.rank}<span className={card.symbol}></span></span>
        )
      })
    }
  }

  render() {
    let game = ''
    switch(this.props.match.params.game.toLowerCase()) {
      case 'war of bets':
        game = 'war'
        break
      case 'baccarat':
        game = 'baccarat'
        break
      case 'bet on poker':
        game = 'poker'
        break
    }
    
      console.log(this.state.draw)
    return (
      <div>
        <Navbar />
        <GameMenu />
        <div className="container" style={{paddingTop: 40, textAlign: 'center'}}>
          <p>Draw Number: {this.state.draw.drawNumber}</p>
          <p>{moment(this.state.draw.createdAt).format('YYYY-MM-DD') } 00:00 - {moment(this.state.draw.createdAt).add('days', 1).format('YYYY-MM-DD')} 00:00 </p> 
          <p>Winner: {this.state.draw.winnerFormatted} ( { this.renderWinningCards() } )</p>

          <br/>
          <div style={{position: 'relative'}}>

            <Waiting />
            <video src={`https://video.betgames.tv/stream${game}/${this.props.match.params.date}/${this.props.match.params.drawNumber}.mp4`} className="fp-engine " autoPlay="true" preload="true" style={{position: 'relative', zIndex: 1, width: '100%', maxWidth: 1024, maxHeight: 576}} ></video>
          </div>
          <br />
          <Link to="/results">Back to Results </Link>
        </div>
      </div>

    )
  }

}
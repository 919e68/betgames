import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import Translate from '../../../libs/translate'
import axios from 'axios'

import GameMenu from '../blocks/game-menu'
import Navbar from '../elements/navbar'
import Stream from '../elements/stream'
import BetOptionsContainer from '../elements/bet-options-container'
import GameParts from '../elements/game-parts'
import GamePart from '../elements/game-part'
import InfoBlock from '../elements/info-block'
import BetOptions from '../elements/bet-options'
import BetOption from '../elements/bet-option'
import BetSlip from '../elements/bet-slip'
import BetSlipHeader from '../elements/bet-slip-header'
import BetButtonGroup from '../elements/bet-button-group'
import BetButton from '../elements/bet-button'
import PlaceBetButton from '../elements/place-bet-button'
import BetInput from '../elements/bet-input'

class Baccarat extends Component {

  constructor(props) {
    super(props)

    this.state = {
      betInput: 0,
      data: {},
      gameParts: [{
        title: 'primary bets',
        id: 9
      }, {
        title: 'player card',
        id: 10
      }, {
        title: 'banker',
        id: 10
      }],
      gamePartId: null,
      odds: {
          
      },
      user: {
        
      }
    }

    this._onChange = this._onChange.bind(this)
  }

  componentDidMount() {
    let self = this
    let socket = new WebSocket('ws://localhost:7000')

    socket.onmessage = function(message) {
      let data = JSON.parse(message.data)
      console.log(data)

      if(data.type == 'create') {
          self.setState({gamePartId: data.data.gamePartId})
      } else {
        self.setState({data: Object.assign({}, data) })
      }
    }
  }

  _onChange(e) {
    this.setState({betInput: e.target.value})
  }

  SetBet(amt) {
    this.setState({betInput: amt})
  }

  placeBet() {
    // CLICK ON PLACE BET BUTTON / SUBMIT PLACE BET FORM
  }

  render() {
    let self = this;

    return (
      <div>
        <Navbar user={this.state.user} />
        <GameMenu />
        <Stream url="http://localhost:3000/streams/baccarat.html" />

        <BetOptionsContainer>
          <GameParts>
            {
              this.state.gameParts.map( (gamePart, index) => {
                return (
                  <GamePart key={index} title={gamePart.title} width={self.state.gamePartId = gamePart.id || index == 0 ? 100 : 0} length={self.state.gameParts.length} />
                )
              })
            }
          </GameParts>

          <InfoBlock data={this.state.data} />

          <header className="capitalized">
            <h4>{Translate('Choose Betting Option')}</h4>
          </header>
          <BetOptions>
            <BetOption betName={Translate('Player')} odds={1} />
            <BetOption betName={Translate('Banker')} odds={1} />
            <BetOption betName={Translate('Tie')} odds={1} />
          </BetOptions>

        </BetOptionsContainer>

        <BetSlip>
          <BetSlipHeader title={Translate('Bet Slip')} />
          <section className="capitalized">
            {Translate('Amount')}
          </section>
          <BetButtonGroup>
            <BetButton disabled={false} active={this.state.betInput == 1} title={'1'} onClick={() => {this.SetBet(1)}} />
            <BetButton disabled={false} active={this.state.betInput == 3} title={'3'} onClick={() => this.SetBet(3)} />
            <BetButton disabled={false} active={this.state.betInput == 4} title={'5'} onClick={() => this.SetBet(5)} />
            <BetButton disabled={false} active={this.state.betInput == 10} title={'10'} onClick={() => this.SetBet(10)} />
            <BetButton disabled={false} active={this.state.betInput == 20} title={'20'} onClick={() => this.SetBet(20)} />
            <BetButton disabled={false} active={this.state.betInput == 30} title={'30'} onClick={() => this.SetBet(30)} />
            <BetButton disabled={false} active={this.state.betInput == 50} title={'50'} onClick={() => this.SetBet(50)} />
            <BetButton disabled={false} active={this.state.betInput == 100} title={'100'} onClick={() => this.SetBet(100)} />
          </BetButtonGroup>

          <BetInput value={this.state.betInput} onChange={this._onChange} />

          <PlaceBetButton onClick={() => {alert()}} disabled={this.state.betInput == ''} />
          </BetSlip>
      </div>
    )
  }
}

export default Baccarat
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

class WarOfBets extends Component {

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
      }],
      gamePartId: null,
      drawNumber: null,
      odds: {},
      user: {},
      selectedOdds: null,
      error: null,
      placingBet: false
    }

    this._onChange = this._onChange.bind(this)
    this.placeBet = this.placeBet.bind(this)
  }

  componentDidMount() {
    let self = this
    self.socket = new WebSocket('ws://localhost:7000')

    self.socket.onmessage = function(message) {
        let data = JSON.parse(message.data)
        console.log(data)

        if(data.type == 'create') {
            self.setState({gamePartId: data.data.gamePartId, drawNumber: data.data.drawNumber})
            self.setState({odds: Object.assign({}, data.data.odds)}, function(){
              console.log(' ODDS' ,self.state.odds)
            })

            // RESET DATA 
            self.setState({selectedOdds: null, betInput: 0})
        } else {
          self.setState({data: Object.assign({}, data) })
        }
    }

    // LOGIN USER 1
    axios.post('http://localhost:3000/graphql', {
      query: `
        query {
          user(id: 1) {
            id
            currentBalance
            username
          }
        }
      `
    }).then(response => {
      self.setState({user: Object.assign({}, response.data.data.user) }, function() {
        console.log(self.state.user)
      })
    })
  }

  componentWillUnmount () {

  }

  _onChange(e) {
    this.setState({betInput: e.target.value})
  }

  SetBet(amt) {
    this.setState({betInput: amt})
  }

  placeBet() {
    let self = this

    // CLICK ON PLACE BET BUTTON / SUBMIT PLACE BET FORM
    if(!this.state.selectedOdds && !this.state.betInput) {
      this.setState({error: 'Please select an option, and your amount to bet'})
      return
    } else if(!this.state.betInput) {
      this.setState({error: 'Please select an amount to bet'})
      return
    } else if (!this.state.selectedOdds) {
      this.setState({error: 'Please select an option'})
      return
    }

    self.setState({placingBet: true})
    axios.post('http://localhost:3000/graphql', {
      query: `
        mutation {
          createBet(data: {
            drawNumber: "${self.state.drawNumber}",
            userId: "1",
            oddId: "${self.state.selectedOdds.odds.id}",
            amount: ${self.state.betInput}
          }) 
          {
            bet {
              id
            }
            errors {
              key
              msg
            }
          }
        }
      `
    }).then(response => {
      console.log('PLACE BET RESPONSE', response)
      self.setState({
        placingBet: false, 
        user: Object.assign({}, self.state.user, {currentBalance: self.state.user.currentBalance - self.state.betInput})
      })
    })
  }

  renderSelectedOdds() {
    let self = this
    let { selectedOdds } = self.state

    if(selectedOdds) {

      return (
        <div>
          Betting for: 
          <div className="well well-sm">
            {selectedOdds.chosenOutcome}&nbsp;({selectedOdds.odds.odds})
          </div>
        </div>
      )
    }
  }

  render() {
    let self = this
    let { data, odds } = self.state

    return (
      <div>
        <Navbar user={this.state.user} />
        <GameMenu />
        <Stream url="http://localhost:3000/streams/war.html" />

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
            {JSON.stringify(this.state.selectedOdds)}
          </header>
          <BetOptions>
            <BetOption 
              loading={data.type == 'waiting'} 
              disabled={data.type == 'winner' || data.type == 'waiting' || odds.dealer == 'lost' } 
              betName={Translate('Dealer Wins')} 
              odds={!odds.dealer ? null : odds.dealer.odds}
              onClick={() => {
                let bet = {
                  odds: odds.dealer,
                  chosenOutcome: 'Dealer Wins'
                }
                self.setState({selectedOdds: Object.assign({}, bet)})
              }}
            />
            <BetOption 
              loading={data.type == 'waiting'} 
              disabled={data.type == 'winner' || data.type == 'waiting' || odds.player == 'lost' } 
              betName={Translate('Player Wins')} 
              odds={!odds.player ? null : odds.player.odds} 
              onClick={() => {
                let bet = {
                  odds: odds.player,
                  chosenOutcome: 'Player Wins'
                }
                self.setState({selectedOdds: Object.assign({}, bet)})
              }}
            />
            <BetOption 
              loading={data.type == 'waiting'} 
              disabled={data.type == 'winner' || data.type == 'waiting' || odds.war == 'lost' } 
              betName={Translate('War')} 
              odds={!odds.war ? null : odds.war.odds} 
              onClick={() => {
                let bet = {
                  odds: odds.war,
                  chosenOutcome: 'War'
                }
                self.setState({selectedOdds: Object.assign({}, bet)})                
              }}
            />
          </BetOptions>

        </BetOptionsContainer>

        <BetSlip>
          <BetSlipHeader title={Translate('Bet Slip')} />

          {
            this.state.error ?
            <section className="place-bet-alerts">
              <div className="alert alert-warning" id="message_block">
                <span className="glyphicon glyphicon-exclamation-sign"></span> {this.state.error}
              </div>
            </section>
            :
            null
          }  

          { this.renderSelectedOdds() } 

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

          <p>Maximum Bet: $100.00</p>

          <PlaceBetButton onClick={this.placeBet} disabled={!this.state.betInput || !this.state.gamePartId || this.state.placingBet} />
          </BetSlip>
      </div>
    )
  }
}

export default WarOfBets

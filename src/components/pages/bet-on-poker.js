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
import RecentBets from '../elements/recent-bets'
import Api from '../../api'

class Poker extends Component {

  constructor(props) {
    super(props)

    this.state = {
      betInput: 0,
      data: {},
      gameParts: [{
          title: 'bet',
          id: 1
      }, {
          title: 'preflop',
          id: 2
      }, {
          title: 'flop',
          id: 3
      }, {
          title: 'turn',
          id: 4
      }, {
          title: 'river',
          id: 5
      }],
      gamePartId: null,
      drawNumber: null,
      odds: {},
      user: {},
      selectedOdds: null,
      error: null,
      placingBet: false,
      hasBet: false,
      limits: {
        min: null,
        max: null
      },
      recentBets: []
    }

    this._onChange = this._onChange.bind(this)
    this.placeBet = this.placeBet.bind(this)
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:7000')
    // GET LATEST DRAW to initialize game
    Api.draws.latestDraw(1).then( response => {
      console.log('LATEST DRAW', response)
      let { draw } = response.data.data.latestDraw
      if(!this.state.drawNumber) {
          this.setState({gamePartId: draw.id, drawNumber: draw.drawNumber})
          this.setState({odds: Object.assign({}, {
            hand_1: { id: +draw.latestOdds[0].id, odds: draw.latestOdds[0].odds },
            hand_2: { id: +draw.latestOdds[1].id, odds: draw.latestOdds[1].odds },
            hand_3: { id: +draw.latestOdds[2].id, odds: draw.latestOdds[2].odds },
            hand_4: { id: +draw.latestOdds[3].id, odds: draw.latestOdds[3].odds },
            hand_5: { id: +draw.latestOdds[4].id, odds: draw.latestOdds[4].odds },
            hand_6: { id: +draw.latestOdds[5].id, odds: draw.latestOdds[5].odds },
          })}, () => {
            console.log('ODDS' , this.state.odds)
          })

          return Api.users.bets(1, 1)
      }
    }).then( response => {
      console.log(' CURRENT BETS', response)
      this.setState({ recentBets: [].concat(response.data.data.user.recentBets) }, () => {
        console.log('recent bets', this.state.recentBets)
      })
    }).catch( err => {
      console.log(err)
    })


    this.socket.onmessage = (message) => {
        let data = JSON.parse(message.data)

        if(data.game != 'poker') {
          return
        }


        if(data.type == 'create') {
          console.log(data)
          this.setState({gamePartId: data.data.gamePartId, drawNumber: data.data.drawNumber})
          this.setState({odds: Object.assign({}, data.data.odds)}, function(){
            // console.log(' ODDS' ,this.state.odds)
          })

          // RESET DATA 
          this.setState({selectedOdds: null, betInput: 0, hasBet: false})
          this.setState({limits: Object.assign({}, { min: null, max: null })}) 

          Api.users.bets(1, 1).then( response => {
            console.log(' CURRENT BETS', response)
            this.setState({ recentBets: [].concat(response.data.data.user.recentBets) }, () => {
              // console.log('recent bets', this.state.recentBets)
            })
          }).catch( err => {
            console.log(err)
          })  

        } else {
          this.setState({data: Object.assign({}, data) }, function() {
            // console.log(this.state.data)
          })
        }
    }

    // LOGIN USER 1
    Api.users.get(1).then(response => {
      this.setState({user: Object.assign({}, response.data.data.user) }, function() {
        console.log(this.state.user)
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
    } else if(this.state.hasBet) {
      this.setState({error: 'You have already placed a bet for this game part'})
      return
    }else if(!this.state.betInput) {
      this.setState({error: 'Please select an amount to bet'})
      return
    } else if (!this.state.selectedOdds) {
      this.setState({error: 'Please select an option'})
      return
    }  else if(this.state.user.currentBalance < this.state.betInput) {
      this.setState({error: 'You don\'t have enough balance'})
      return
    }

    self.setState({placingBet: true})

    let data = {
      drawNumber: self.state.drawNumber,
      userId: 1,
      oddId: self.state.selectedOdds.odds.id,
      amount: self.state.betInput
    }

    console.log(self.state.selectedOdds.odds)

    Api.bets.create(data).then(response => {
      console.log('PLACE BET RESPONSE', response)
      self.setState({
        placingBet: false, 
        user: Object.assign({}, self.state.user, {currentBalance: self.state.user.currentBalance - self.state.betInput}),
        error: null,
        hasBet: true
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
    let { data, odds, selectedOdds } = self.state

    return (
      <div>
        <Navbar user={this.state.user} />
        <GameMenu activeGame="poker"/>
        <Stream url="http://localhost:3000/streams/poker.html" />

        <BetOptionsContainer>
          <GameParts>
            {
              this.state.gameParts.map( (gamePart, index) => {
                return (
                  <GamePart key={index} title={gamePart.title} width={this.state.gamePartId == gamePart.id || index == 0 ? 100 : 0} length={this.state.gameParts.length} />
                )
              })
            }
          </GameParts>

          <InfoBlock data={this.state.data} />

          <header className="capitalized">
            <h4>{Translate('Choose Betting Option')}</h4>
          </header>
          <BetOptions>
            <BetOption 
              showingWinner={data.type == 'winner'}
              winner={data.data ? data.data.winner == 'dealer' : false}
              loading={data.type == 'waiting' || !self.state.drawNumber} 
              disabled={data.type == 'winner' || data.type == 'waiting' } 
              betName={Translate('Hand 1 Wins')} 
              // active={selectedOdds ? selectedOdds.winner == 'dealer' : false}
              odds={!odds.hand_1 ? null : odds.hand_1.odds}
              onClick={() => {
                let bet = {
                  odds: odds.hand_1,
                  chosenOutcome: 'Hand 1 Wins',
                  winner: 'hand_1'
                }

                self.setState({selectedOdds: Object.assign({}, bet)})
                if (odds.hand_1.odds >= 10) {
                  self.setState({limits: Object.assign({}, { min: 1, max: 50 })})
                } else {
                  self.setState({limits: Object.assign({}, { min: null, max: null })})
                }
              }}
            />
            
            <BetOption 
              showingWinner={data.type == 'winner'}
              winner={data.data ? data.data.winner == 'dealer' : false}
              loading={data.type == 'waiting' || !self.state.drawNumber} 
              disabled={data.type == 'winner' || data.type == 'waiting' } 
              betName={Translate('Hand 2 Wins')} 
              // active={selectedOdds ? selectedOdds.winner == 'dealer' : false}
              odds={!odds.hand_2 ? null : odds.hand_2.odds}
              onClick={() => {
                let bet = {
                  odds: odds.hand_2,
                  chosenOutcome: 'Hand 2 Wins',
                  winner: 'hand_2'
                }

                self.setState({selectedOdds: Object.assign({}, bet)})
                if (odds.hand_2.odds >= 10) {
                  self.setState({limits: Object.assign({}, { min: 1, max: 50 })})
                } else {
                  self.setState({limits: Object.assign({}, { min: null, max: null })})
                }
              }}
            />
            <BetOption 
              showingWinner={data.type == 'winner'}
              winner={data.data ? data.data.winner == 'dealer' : false}
              loading={data.type == 'waiting' || !self.state.drawNumber} 
              disabled={data.type == 'winner' || data.type == 'waiting' } 
              betName={Translate('Hand 3 Wins')} 
              // active={selectedOdds ? selectedOdds.winner == 'dealer' : false}
              odds={!odds.hand_3 ? null : odds.hand_3.odds}
              onClick={() => {
                let bet = {
                  odds: odds.hand_3,
                  chosenOutcome: 'Hand 3 Wins',
                  winner: 'hand_3'
                }

                self.setState({selectedOdds: Object.assign({}, bet)})
                if (odds.hand_3.odds >= 10) {
                  self.setState({limits: Object.assign({}, { min: 1, max: 50 })})
                } else {
                  self.setState({limits: Object.assign({}, { min: null, max: null })})
                }
              }}
            />
            <BetOption 
              showingWinner={data.type == 'winner'}
              winner={data.data ? data.data.winner == 'dealer' : false}
              loading={data.type == 'waiting' || !self.state.drawNumber} 
              disabled={data.type == 'winner' || data.type == 'waiting' } 
              betName={Translate('Hand 4 Wins')} 
              // active={selectedOdds ? selectedOdds.winner == 'dealer' : false}
              odds={!odds.hand_4 ? null : odds.hand_4.odds}
              onClick={() => {
                let bet = {
                  odds: odds.hand_4,
                  chosenOutcome: 'Hand 4 Wins',
                  winner: 'hand_4'
                }

                self.setState({selectedOdds: Object.assign({}, bet)})
                if (odds.hand_4.odds >= 10) {
                  self.setState({limits: Object.assign({}, { min: 1, max: 50 })})
                } else {
                  self.setState({limits: Object.assign({}, { min: null, max: null })})
                }
              }}
            />
            <BetOption 
              showingWinner={data.type == 'winner'}
              winner={data.data ? data.data.winner == 'dealer' : false}
              loading={data.type == 'waiting' || !self.state.drawNumber} 
              disabled={data.type == 'winner' || data.type == 'waiting' } 
              betName={Translate('Hand 5 Wins')} 
              // active={selectedOdds ? selectedOdds.winner == 'dealer' : false}
              odds={!odds.hand_5 ? null : odds.hand_5.odds}
              onClick={() => {
                let bet = {
                  odds: odds.hand_5,
                  chosenOutcome: 'Hand 5 Wins',
                  winner: 'hand_5'
                }

                self.setState({selectedOdds: Object.assign({}, bet)})
                if (odds.hand_5.odds >= 10) {
                  self.setState({limits: Object.assign({}, { min: 1, max: 50 })})
                } else {
                  self.setState({limits: Object.assign({}, { min: null, max: null })})
                }
              }}
            />
            <BetOption 
              showingWinner={data.type == 'winner'}
              winner={data.data ? data.data.winner == 'dealer' : false}
              loading={data.type == 'waiting' || !self.state.drawNumber} 
              disabled={data.type == 'winner' || data.type == 'waiting' } 
              betName={Translate('Hand 6 Wins')} 
              // active={selectedOdds ? selectedOdds.winner == 'dealer' : false}
              odds={!odds.hand_6 ? null : odds.hand_6.odds}
              onClick={() => {
                let bet = {
                  odds: odds.hand_6,
                  chosenOutcome: 'Hand 6 Wins',
                  winner: 'hand_6'
                }

                self.setState({selectedOdds: Object.assign({}, bet)})
                if (odds.hand_6.odds >= 10) {
                  self.setState({limits: Object.assign({}, { min: 1, max: 50 })})
                } else {
                  self.setState({limits: Object.assign({}, { min: null, max: null })})
                }
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

          {
            !this.state.hasBet && !this.state.selectedOdds ? 
            <section className="bet-slip-alerts">
              <div id="empty_cart" style={{display: 'block', marginBottom: 16}}>
                Your bet slip is empty. Please choose betting option from a list.        
              </div>
            </section>
            :
            null
          } 

          <section className="capitalized">
            {Translate('Amount')}
          </section>

          <BetButtonGroup>
            <BetButton disabled={data.type == 'winner' || data.type == 'waiting' || (this.state.limits.max ? this.state.limits.max < 1 : false) || (this.state.limits.min ? this.state.limits.min > 1 : false)} active={this.state.betInput == 1} title={'1'} onClick={() => {this.SetBet(1)}} /> 

            <BetButton disabled={data.type == 'winner' || data.type == 'waiting' || (this.state.limits.max ? this.state.limits.max < 3 : false) || (this.state.limits.min ? this.state.limits.min > 3 : false)} active={this.state.betInput == 3} title={'3'} onClick={() => this.SetBet(3)} />

            <BetButton disabled={data.type == 'winner' || data.type == 'waiting' || (this.state.limits.max ? this.state.limits.max < 5 : false) || (this.state.limits.min ? this.state.limits.min > 5 : false)} active={this.state.betInput == 4} title={'5'} onClick={() => this.SetBet(5)} />

            <BetButton disabled={data.type == 'winner' || data.type == 'waiting' || (this.state.limits.max ? this.state.limits.max < 10 : false) || (this.state.limits.min ? this.state.limits.min > 10 : false)} active={this.state.betInput == 10} title={'10'} onClick={() => this.SetBet(10)} />

            <BetButton disabled={data.type == 'winner' || data.type == 'waiting' || (this.state.limits.max ? this.state.limits.max < 20 : false) || (this.state.limits.min ? this.state.limits.min > 20 : false)} active={this.state.betInput == 20} title={'20'} onClick={() => this.SetBet(20)} />

            <BetButton disabled={data.type == 'winner' || data.type == 'waiting' || (this.state.limits.max ? this.state.limits.max < 30 : false) || (this.state.limits.min ? this.state.limits.min > 30 : false)} active={this.state.betInput == 30} title={'30'} onClick={() => this.SetBet(30)} />

            <BetButton disabled={data.type == 'winner' || data.type == 'waiting' || (this.state.limits.max ? this.state.limits.max < 50 : false) || (this.state.limits.min ? this.state.limits.min > 50 : false)} active={this.state.betInput == 50} title={'50'} onClick={() => this.SetBet(50)} />

            <BetButton disabled={data.type == 'winner' || data.type == 'waiting' || (this.state.limits.max ? this.state.limits.max < 100 : false) || (this.state.limits.min ? this.state.limits.min > 100: false)} active={this.state.betInput == 100} title={'100'} onClick={() => this.SetBet(100)} />
          </BetButtonGroup>

          <BetInput value={this.state.betInput} onChange={this._onChange} />

          <p>
            { 
              this.state.limits.min ? <span>Min: ${this.state.limits.min.toFixed(2)} </span> : <span></span>
            }
            {
              this.state.limits.max ? <span>Max: ${this.state.limits.max.toFixed(2)} </span> : <span></span>
            }
          </p>

          {
            this.state.hasBet ?
            <section className="place-bet-alerts">
              <div className="alert alert-info">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                &nbsp;Your bet has been placed successfully.
              </div>
            </section>
            :
            null
          }

          <PlaceBetButton onClick={this.placeBet} disabled={!this.state.betInput || !this.state.gamePartId || this.state.placingBet || this.state.hasBet } />

          </BetSlip>
          <RecentBets bets={this.state.recentBets} />
      </div>
    )
  }
}

export default Poker

import React, { Component } from 'react'

export default class RecentBets extends Component { 

  renderRecentBets() {
    if(!this.props.bets.length) {
      return (
        <p>You haven't made a bet for this game yet. </p>
      )
    } else {
      return (
        this.props.bets.map( (bet, i) => {

          if(!bet.odd) {
            return
          }

          if(bet.odd.isWinner == null) {
            return
          }

          return (
            <div className="bet-record" key={i}>
              <div className="bet-round">{bet.draw.game.name} / {bet.odd.gamePart.name}</div>
              <div className="bet-description">{bet.odd.outcome.name} &nbsp;
                <span className="nowrap"></span>
                <span className="nowrap">( ${bet.amount.toFixed(2)} / {bet.odd.odds.toFixed(2)} )</span>
              </div>
              <div className={`bet-status ${(bet.odd.isWinner ? 'won' : 'lost')}`}>{bet.odd.isWinner ? 'won' : 'lost'}</div>
            </div>
          )
        })
      )
    }
  }

  render() {
    return (
      <aside className="bets-recent-history col-sm-4 ">
        <header>
          <h4>Recent bets</h4>
        </header>
        <section className="bets-history-body">
          
          {
            this.renderRecentBets()
          }

       </section>
        <section className="recent-bets-actions">
          <a href="/bet-history">
          Bet history</a>
        </section>
      </aside>    
    ) 
  }

}
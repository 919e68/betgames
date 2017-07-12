import React, {Component} from 'react'

export default class InfoBlock extends Component {
  /*
        @props object data
    */
  render() {

    switch (this.props.data.type) {
      case 'waiting':
        return (
          <section className="odds-alert-block">
            <div className="alert alert-messages text-center alert-info">
              <div id="message-text">{this.props.data.msg}</div>
            </div>
            <div className="clear"></div>
          </section>
        )
      case 'countdown':
        return (
          <section className="odds-alert-block">
            <div className="alert alert-messages text-center alert-bets">
              <div id="message-text">
                <strong>Place your bets</strong>
              </div>
              <span id="countdown_bet" className="badge has_countdown">
                <span className="countdown_row countdown_amount">{this.props.data.timer}</span>
              </span>
            </div>
            <div className="clear"></div>
          </section>
        )
      case 'winner':
        return (
          <section className="odds-alert-block">
            <div className="alert alert-messages text-center alert-results">
              <div id="message-text">
                <div id="results-winner-cards">
                  <span className="results-player-cards">Won:
                    <span id="results-war-winner">Player
                    </span>
                    <span className="results-player-cards">
                      <span className={`card ${this.props.data.winningSymbol}`}>4<span className={this.props.data.winningSymbol}></span>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <span id="countdown_bet" className="badge has_countdown hidden">
                <span className="countdown_row countdown_amount">00:20</span>
              </span>
            </div>
            <div className="clear"></div>
          </section>
        )
      default:
        return (
          <div></div>
        )
    }

  }
}

//  WINNING CARD             <div className="alert alert-messages text-center
// alert-results">     <div id="message-text"><div
// id="results-winner-cards"><span className="results-player-cards">Won: <span
// id="results-war-winner">Player </span><span
// className="results-player-cards"><span className="card spades">9<span
// className="spades"></span></span></span></span></div></div>     <span
// id="countdown_bet" className="badge has_countdown hidden"><span
// className="countdown_row countdown_amount">00:00</span></span> </div> WAITING
// BLOCK

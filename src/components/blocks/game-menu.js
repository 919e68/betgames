import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'

import Translate from '../../../libs/translate'

class GameMenu extends Component {
  render() {
    return (
      <nav className='games-navigation'>
        <ul className='nav nav-pills lotteries-count-9'>
          <li className={`lottery-link-9 ${(this.props.activeGame == 'poker' ? 'active' : '')}`} title='Bet on Poker'>
            <Link to='/poker'>
              <span className='lottery-name'>{Translate('Bet on Poker')}</span>
            </Link>
          </li>

          <li className={`lottery-link-5 ${(this.props.activeGame == 'baccarat' ? 'active' : '')}`} title='Baccarat'>
            <Link to='/baccarat'>
              <span className='lottery-name'>{Translate('Baccarat')}</span>
            </Link>
          </li>

          <li className={`lottery-link-8 ${(this.props.activeGame == 'war' ? 'active' : '')}`} title='War of Bets'>
            <Link to='/war'>
              <span className='lottery-name'>{Translate('War of Bets')}</span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default GameMenu
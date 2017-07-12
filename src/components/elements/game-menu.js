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
          <li className='lottery-link-9' title='Lucky 7'>
            <Link to='/bet-on-poker'>
              <span className='lottery-name'>{Translate('Bet on Poker')}</span>
            </Link>
          </li>

          <li className='lottery-link-5' title='Lucky 7'>
            <Link to='/baccarat'>
              <span className='lottery-name'>{Translate('Baccarat')}</span>
            </Link>
          </li>

          <li className='lottery-link-8' title='Lucky 7'>
            <Link to='/war-of-bets'>
              <span className='lottery-name'>{Translate('War of Bets')}</span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default GameMenu
import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'

import Translate from '../../../libs/translate'

class Stream extends Component {
  render() {
    return (
      <div>
        <iframe src={this.props.url} scrolling='no' id="bet-games-stream"></iframe>
      </div>
    )
  }
}

export default Stream
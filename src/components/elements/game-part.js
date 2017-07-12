import React, { Component } from 'react'
import Translate from '../../../libs/translate'

export default class GamePart extends Component {
  /*
    @props string title
  */
  render() {
    return( 
      <div className={`round-count-${this.props.length || 2} progress-round`}>
        <div className="progress-name capitalized">{Translate(this.props.title)}</div>
        <div className="progress progress-striped">
          <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ width: this.props.width + '%' }}></div>
        </div>
      </div>
    )
  }
}

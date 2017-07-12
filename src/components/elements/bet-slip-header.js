import React, {Component} from 'react'

export default class BetSlipHeader extends Component {
  /*
      @props string title
  */
  render() {
    return (
      <header>
        <h4>{this.props.title}</h4>
        <button type="button" className="close">
          <span aria-hidden="true" className="glyphicon glyphicon-remove"></span>
        </button>
      </header>
    )
  }
}
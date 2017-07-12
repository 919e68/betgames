import React, {Component} from 'react'
import Translate from '../../../libs/translate'

export default class PlaceBetButton extends Component {
  /*
        @props function onClick
    */
  constructor(props) {
    super(props)

    this._onClick = this._onClick.bind(this)
  }

  _onClick() {
    console.log(this.props)
    if (this.props.disabled) {
      return
    }

    this.props.onClick()
  }

  render() {
    return (
      <section className="bet-slip-action">
        <a
          href="javascript:void(0)"
          className="btn btn-lg btn-block place-bet-button"
          onClick={this._onClick}
          disabled={this.props.disabled}>
          {Translate('Place Bet')}
        </a>
        <section className="place-bet-alerts"></section>
      </section>
    )
  }
}
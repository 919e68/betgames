import React, {Component} from 'react'

export default class BetSlip extends Component {
  render() {
    return (
      <aside className="bet-slip col-sm-4">
        {this.props.children}
      </aside>
    )
  }
}
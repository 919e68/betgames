import React, {Component} from 'react'

export default class BetOptionsContainer extends Component {
  render() {
    return (
      <section className="odds-panel col-sm-8">
        {this.props.children}
      </section>
    )
  }
}
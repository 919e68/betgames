import React, { Component } from 'react'
export default class BetButtonGroup extends Component {

  render () {
    return (
      <section className="lottery-chosen-amount clearfix">
        {this.props.children}
      </section>
    )
  }

}

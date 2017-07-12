import React, {Component} from 'react'

export default class GameParts extends Component {
  render() {
    return (
      <section className="game-progress-bar clearfix">
        {this.props.children}
      </section>
    )
  }
}

import React, {
  Component
} from 'react'

export default class BetButton extends Component {
  /*
      @props function onClick
      @props string title
      @props boolean active
      @props boolean disabled
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
      <button type = "button"
        className = {
          'btn btn-default btn-lg pull-left ' + (this.props.active ? 'active' : '') + ' ' + (this.props.disabled ? 'disabled' : '')
        }
        onClick = {
          this.props.onClick
        } 
        disabled={this.props.disabled}
      >
        {
          this.props.title
        } 
      </button>
    )
  }
}
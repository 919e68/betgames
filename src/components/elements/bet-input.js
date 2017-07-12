import React, { Component } from 'react'

export default class BetInput extends Component {
  render() {
    return (
      <section className="bet">
        <div className="form-group">
          <div className="input-group">
            <input 
                maxLength="10" 
                className="bet-amount-input form-control input-lg text-right" 
                placeholder="0.00" 
                type="text"
                readOnly={true}
                value={this.props.value.toFixed(2)} 
                onChange={this.props.onChange}
            />
            <span className="bet-currency-sign input-group-addon">€</span>
          </div>
          <div className="bet-limits"></div>
        </div>
      </section>
    )
  }
}
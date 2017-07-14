import React, { Component } from 'react'
import DatePicker from 'react-bootstrap-date-picker'

export default class Calendar extends Component {
  render() {
    return (
      <div className="input-group date" id="datepicker">
        <input type="text" className="form-control"/>
        <span className="input-group-addon">
          <span className="glyphicon glyphicon-calendar"></span>
        </span>
      </div>
    )
  }
}


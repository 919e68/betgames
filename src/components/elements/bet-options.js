import React, {Component} from 'react'
import Translate from '../../../libs/translate'

export default class BetOptions extends Component {
  render() {
    return (
      <section className="panel-group" id="accordion">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-target="#" className="" aria-expanded="true">
                {Translate('Main Bets')}
                <span className="glyphicon glyphicon-chevron-down pull-right"></span>
              </a>
            </h4>
          </div>
          <div id="group_45" className="panel-collapse collapse in" aria-expanded="true">
            <div className="panel-body">
              <div className="list-group">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
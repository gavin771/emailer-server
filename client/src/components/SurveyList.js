import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys } from '../actions'

class SurveyList extends Component {
  componentDidMount () {
    this.props.fetchSurveys();
  }

  renderContent () {
    return this.props.surveys.reverse().map(s => {
      return (
        <div key={s._id} className="card">
          <div className="card-content">
            <span className="card-title">
              {s.title}
            </span>
            <p>
              {s.body}
            </p>
            <p className="right">
              Sent On:{new Date(s.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {s.yes}</a>
            <a>No: {s.no}</a>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

function mapStateToProps ({ surveys }) {
  return { surveys }
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList)
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import { Link } from 'react-router-dom'
import validateEmails from '../../utils/validateEmails'

const FIELDS = [
  {
    label: "Survey Title",
    name: "title"
  }, {
    label: "Subject Line",
    name: "subject"
  }, {
    label: "Email Body",
    name: "body"
  }, {
    label: "Recipient List",
    name: "email"
  }
]

class SurveyForm extends Component {

  renderFields () {
    return FIELDS.map(({ label, name }) => {
      return (
        <Field key={name} component={SurveyField} type="text" label={label} name={name} />
      )
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
          <i className="material-icons right">close</i>
          </Link>

          <button type="submit" className="teal btn-flat right white-text">
            Next
          <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate (values) {
  const errors = {};
  FIELDS.forEach(({ name }) => {

    errors.email=validateEmails(values.emails||'');

    if (!values[name]) {
      errors[name] = `You must enter a ${name}`
    }
  })

  return errors
}

export default reduxForm({
  form: 'surveyForm',
  validate
})(SurveyForm)
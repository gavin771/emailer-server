import React from 'react'

const SurveyField = ({ input, label, meta: { error, touched } }) => {
  return (
    <div style={{
      marginTop: '75px',
    }}>
      <label >{label}</label>
      <input {...input} style={{
        marginBottom: '5px',
      }} />
      <div className="red-text" style={{ marginBottom: '10px' }}>
        {touched && error}
      </div>
    </div>
  )
}

export default SurveyField
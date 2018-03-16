import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn waves-effect waves-light btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
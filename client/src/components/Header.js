import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends Component {
  renderContent (auth) {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        )
      default:
        return [
          <li key='1'><Payments /></li>,
          <li key='2' style={{ margin: '0 15px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key='3'>
            <a href="/auth/logout">Logout</a>
          </li>
        ];
    }
  }
  render () {
    return (
      <nav>
        <div className="container nav-wrapper">
          <Link to={this.props.auth ? "/surveys" : "/"} className="brand-logo left">Emaily</Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent(this.props.auth)}

          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(Header)
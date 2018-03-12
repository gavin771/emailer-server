import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component {
  renderContent (auth) {
    console.log(auth);
    switch (auth) {
      case null:
        return null;//()
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        )
      default:
        return (
          <li>
            <a href="/auth/logout">Logout</a>
          </li>
        )
    }
  }
  render () {
    return (
      <nav>
        <div className="container nav-wrapper">
          <a href="/" className="brand-logo left">Emaily</a>
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
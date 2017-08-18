import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import SignOut from './SignOut';

class Header extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userFirstName: PropTypes.string.isRequired
  };

  render() {
    let logoutForm;

    if (this.props.isLoggedIn) {
      logoutForm = (
        <div>
          <p>Hi, {this.props.userFirstName}!</p>
          <SignOut/>
        </div>
      );
    }

    return (
      <header>
        <h1>To-Do</h1>
        <h2>Written with Express.js</h2>
        {logoutForm}
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.account.isLoggedIn,
    userFirstName: state.account.firstName
  };
};

export default connect(mapStateToProps)(Header);

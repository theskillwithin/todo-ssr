import classNames from 'classnames';
import {connect} from 'react-redux';
import includesInvalidation from '../util/includesInvalidation';
import Invalidations from './Invalidations';
import PropTypes from 'prop-types';
import React from 'react';
import {signIn} from '../actions/account';
//import {signIn} from '../services/account';

class SignIn extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      email: '',
      invalidations: [],
      password: '',
      submitting: false
    };

    //this.mounted = false;
  }

  /*componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }*/

  handleInput(event) {
    const name  = event.currentTarget.getAttribute('name');
    const value = event.currentTarget.value;

    this.setState({...this.state, [name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.signIn(this.state.email, this.state.password);
  }

  isValid(propertyName) {
    return includesInvalidation(this.state.invalidations, propertyName);
  }

  async signIn(...args) {
    if (!this.state.submitting) {
      this.setState({...this.state, submitting: true});

      try {
        await this.props.signIn(...args);

        this.setState({...this.state, submitting: false});
      } catch(error) {
        // TODO :: terminate fetch() or cancel promise instead? https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
        if (this.mounted) {
          // TODO :: https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend/issues/14
          if (error.name === 'ValidationError') {
            this.setState({...this.state, submitting: false, invalidations: error.invalidations});
          } else {
            this.setState({...this.state, submitting: false});
            throw error;
          }
        }
      }
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return null;
    } else {
      return (
        <form
          action="/signin"
          method="post"
          onSubmit={event => this.handleSubmit(event)}>

            <Invalidations items={this.state.invalidations}/>

            <label>
              Email
              <input
                className={classNames({invalid: this.isValid('email')})}
                name="email"
                onChange={event => this.handleInput(event)}
                required
                type="email"
                value={this.state.email}/>
            </label>

            <label>
              Password
              <input
                className={classNames({invalid: this.isValid('password')})}
                name="password"
                onChange={event => this.handleInput(event)}
                required
                type="password"/>
            </label>

            <button
              disabled={this.state.submitting}
              type="submit">
                Sign In
            </button>

        </form>
      );
    }
  }
}

const mapDispatchToProps = {signIn};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.account.isLoggedIn
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

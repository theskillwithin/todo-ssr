import classNames from 'classnames';
import includesInvalidation from '../util/includesInvalidation';
import Invalidations from './Invalidations';
import React from 'react';
import {signUp} from '../services/account';

export default class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      firstName: '',
      invalidations: [],
      lastName: '',
      password: '',
      submitting: false
    };

    this.mounted = false;
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleInput(event) {
    const name  = event.currentTarget.getAttribute('name');
    const value = event.currentTarget.value;

    this.setState({...this.state, [name]: value});
  }

  async handleSubmit(event) {
    event.preventDefault();

    const {email, firstName, lastName, password} = this.state;

    await this.signUp(email, firstName, lastName, password);
  }

  isValid(propertyName) {
    return includesInvalidation(this.state.invalidations, propertyName);
  }

  async signUp(...args) {
    if (!this.state.submitting) {
      this.setState({...this.state, submitting: true});

      try {
        await signUp(...args);

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
    return (
      <form
        action="/signup"
        method="post"
        onSubmit={event => this.handleSubmit(event)}>

          <Invalidations items={this.state.invalidations}/>

          <label>
            First Name
            <input
              className={classNames({invalid: this.isValid('firstName')})}
              name="firstName"
              onChange={event => this.handleInput(event)}
              required
              type="text"
              value={this.state.firstName}/>
          </label>

          <label>
            Last Name
            <input
              className={classNames({invalid: this.isValid('lastName')})}
              name="lastName"
              onChange={event => this.handleInput(event)}
              required
              type="text"
              value={this.state.lastName}/>
          </label>

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
                Sign Up
            </button>

      </form>
    );
  }
}

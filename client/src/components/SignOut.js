import React from 'react';
import {signOut} from '../services/account';

export default class SignOut extends React.Component {
  constructor() {
    super();

    this.state = {
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

  handleSubmit(event) {
    event.preventDefault();
    this.signOut();
  }

  async signOut() {
    if (!this.state.submitting) {
      this.setState({...this.state, submitting: true});

      try {
        await signOut();
      } catch(error) {
        // TODO :: terminate fetch() or cancel promise instead? https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
        if (this.mounted) {
          throw error;
        }
      } finally {
        if (this.mounted) {
          this.setState({...this.state, submitting: false});
        }
      }
    }
  }

  render() {
    return (
      <form
        action="/signout"
        method="post"
        onSubmit={event => this.handleSubmit(event)}>
          <button
              disabled={this.state.submitting}
              type="submit">
                Logout
            </button>
      </form>
    );
  }
}

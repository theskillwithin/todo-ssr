import React from 'react';

export default class Welcome extends React.Component {
  constructor() {
    super();

    this.state = {
      parent1: {
        child: {
          prop: 'value1'
        }
      },
      parent2: {
        child: {
          prop: 'value1'
        }
      }
    };
  }

  handleClick(event) {
    this.setState({
      parent2: {
        child: {
          ...this.state.parent2.child,
          prop2: 'value2'
        }
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.parent1.child.prop}
        {' '}
        {this.state.parent2.child.prop}
        {' '}
        {this.state.parent2.child.prop2}
        {' '}
        <button onClick={event => this.handleClick(event)}>toggle</button>
      </div>
    );
  }

  /*render() {
    return (
      <p>
        Welcome! Please <a href="/login">login</a> or
        <a href="/signup">sign up</a>.
      </p>
    );
  }*/
}

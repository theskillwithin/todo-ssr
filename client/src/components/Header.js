import {connect} from 'react-redux';
import React from 'react';
import SignOut from './SignOut';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      userFirstName: ''
    };
  }

  render() {
    let logoutForm;

    // TODO :: move some of this logic to SignOut component
    if (this.state.isLoggedIn) {
      logoutForm = (
        <div>
          <p>Hi, {this.state.userFirstName}!</p>
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

const mapDispatchToProps = {
  //onTodoClick: toggleTodo
};

const mapStateToProps = state => {
  return {
    //todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

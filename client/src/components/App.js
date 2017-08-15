import Footer from './Footer';
import Header from './Header';
import React from 'react';
import SignIn from './SignIn';
//import SignUp from './SignUp';
//import Welcome from './Welcome';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>

        <main><SignIn/></main>

        <Footer/>
      </div>
    );
  }
}

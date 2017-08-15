import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p>© <time>{new Date().getFullYear()}</time> No one.</p>
      </footer>
    );
  }
}

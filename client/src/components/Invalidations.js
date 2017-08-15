import PropTypes from 'prop-types';
import React from 'react';

export default class Invalidations extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string,
      property: PropTypes.string
    })).isRequired
  };

  render() {
    if (this.props.items.length > 0) {
      const messages = this.props.items.map(({message, property}) => {
        return <p key={property}><strong>{message}</strong></p>;
      });

      return <aside className="danger">{messages}</aside>;
    } else {
      return null;
    }
  }
}

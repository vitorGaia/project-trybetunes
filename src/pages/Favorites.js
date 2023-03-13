import React from 'react';
import Header from './Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <span>favorites</span>
      </div>
    );
  }
}

export default Favorites;

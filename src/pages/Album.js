import React from 'react';
import Header from './Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <span>album</span>
      </div>
    );
  }
}

export default Album;

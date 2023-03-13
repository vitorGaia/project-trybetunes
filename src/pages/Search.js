import React from 'react';
import Header from './Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <span>search</span>
      </div>
    );
  }
}

export default Search;

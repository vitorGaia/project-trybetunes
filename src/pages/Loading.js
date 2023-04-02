import React from 'react';
import '../styles/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-page">

        <div className="loader">
          <div className="cell d-0" />
          <div className="cell d-1" />
          <div className="cell d-2" />

          <div className="cell d-1" />
          <div className="cell d-2" />

          <div className="cell d-2" />
          <div className="cell d-3" />

          <div className="cell d-3" />
          <div className="cell d-4" />

        </div>

      </div>
    );
  }
}

export default Loading;

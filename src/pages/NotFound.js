/* eslint-disable react/jsx-max-depth */
import React from 'react';
import '../styles/NotFound.css';
import Header from './Header';

class NotFound extends React.Component {
  render() {
    return (
      <div className="page-not-found-container">
        <Header />
        <div data-testid="page-not-found" className="title-not-found-container">
          <h1>Página não encontrada!</h1>

          <div
            aria-label="Orange and tan hamster running in a metal wheel"
            role="img"
            className="wheel-and-hamster"
          >
            <div className="wheel" />
            <div className="hamster">
              <div className="hamster__body">
                <div className="hamster__head">
                  <div className="hamster__ear" />
                  <div className="hamster__eye" />
                  <div className="hamster__nose" />
                </div>
                <div className="hamster__limb hamster__limb--fr" />
                <div className="hamster__limb hamster__limb--fl" />
                <div className="hamster__limb hamster__limb--br" />
                <div className="hamster__limb hamster__limb--bl" />
                <div className="hamster__tail" />
              </div>
            </div>
            <div className="spoke" />
          </div>

        </div>
      </div>
    );
  }
}

export default NotFound;

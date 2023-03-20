import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import '../styles/Loguin.css';
import userImage from '../images/userImage2.jpg';

class Loguin extends React.Component {
  state = {
    loguinNameInput: '',
    loguinSubmitButton: true,
    loading: undefined,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.ableBtn);
  };

  ableBtn = () => {
    const { loguinNameInput } = this.state;
    const minLength = 3;
    if (loguinNameInput.length >= minLength) {
      this.setState({ loguinSubmitButton: false });
    } else {
      this.setState({ loguinSubmitButton: true });
    }
  };

  callCreateUser = async () => {
    this.setState({ loading: true });
    const { loguinNameInput } = this.state;
    const response = await createUser({ name: loguinNameInput });
    if (response === 'OK') this.setState({ loading: false });
  };

  render() {
    const {
      loguinNameInput,
      loguinSubmitButton,
      loading,
    } = this.state;
    return (
      <div data-testid="page-login" className="loguin-container">
        { loading === false && <Redirect to="/search" /> }
        <form className="loguin-form">
          <div className="image-container">
            <img
              className="user-image"
              alt="user"
              src={ userImage }
            />
          </div>
          <div className="inputs-container">
            <label>
              <input
                className="loguin-input"
                data-testid="login-name-input"
                type="text"
                placeholder="Nome"
                onChange={ this.handleChange }
                value={ loguinNameInput }
                name="loguinNameInput"
              />
            </label>
            <label>
              <input
                className="loguin-input"
                type="email"
                placeholder="Email"
                onChange={ this.handleChange }
                /* value={ loguinNameInput }
                name="loguinNameInput" */
              />
            </label>
            <div className="button-container">
              <button
                className="loguin-button"
                data-testid="login-submit-button"
                type="button"
                disabled={ loguinSubmitButton }
                name="loguinSubmitButton"
                onClick={ this.callCreateUser }
              >
                { loading ? 'Carregando...' : 'Entrar' }
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Loguin;

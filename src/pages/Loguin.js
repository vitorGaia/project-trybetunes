import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div data-testid="page-login">
        { loading && <Loading /> }
        { loading === false && <Redirect to="/search" /> }
        <form>
          <div>
            <label>
              <input
                data-testid="login-name-input"
                type="text"
                placeholder="nome"
                onChange={ this.handleChange }
                value={ loguinNameInput }
                name="loguinNameInput"
              />
            </label>
          </div>
          <div>
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ loguinSubmitButton }
              name="loguinSubmitButton"
              onClick={ this.callCreateUser }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Loguin;

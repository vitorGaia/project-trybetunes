/* eslint-disable max-len */
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
      <section
        data-testid="page-login"
        className="bg-stone-200 min-h-screen flex items-center justify-center"
      >

        { loading === false && <Redirect to="/search" /> }

        <form className="bg-white p-10 rounded-xl shadow-lg text-center py-16 px-12 mb-10">

          <div className="inputs-container">

            <h1 className="text-6xl mb-10">Sing In</h1>

            <div>
              <input
                className="w-full block bg-black rounded p-2 text-white mb-3"
                data-testid="login-name-input"
                type="text"
                placeholder="Name"
                onChange={ this.handleChange }
                value={ loguinNameInput }
                name="loguinNameInput"
              />
            </div>

            <div>
              <input
                className="w-full block bg-black rounded p-2 text-white placeholder-center"
                type="email"
                placeholder="Email"
                onChange={ this.handleChange }
                /* value={ loguinNameInput }
                name="loguinNameInput" */
              />
            </div>

            <div>
              <button
                className="bg-green-400 hover:bg-green-600 p-3 w-full mt-3 rounded-lg shadow-lg"
                data-testid="login-submit-button"
                type="button"
                disabled={ loguinSubmitButton }
                name="loguinSubmitButton"
                onClick={ this.callCreateUser }
              >
                { loading ? <Loading /> : 'Loguin' }
              </button>
            </div>

          </div>

        </form>

      </section>
    );
  }
}

export default Loguin;

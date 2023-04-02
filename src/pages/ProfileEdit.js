import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/ProfileEdit.css';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    disableBtn: true,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const data = await getUser();
    if (data) {
      const { description, email, image, name } = data;
      this.setState({
        loading: false,
        description,
        email,
        image,
        name,
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    }, this.ableBtn());
  };

  ableBtn = () => {
    const {
      name,
      email,
      description,
      image,
    } = this.state;
    if (
      name.length !== 0
      && email.length !== 0
      && description.length !== 0
      && image.length !== 0
    ) (this.setState({ disableBtn: false }));
  };

  setNewUserProfile = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      description,
      image,
    } = this.state;
    const newProfile = {
      name,
      email,
      image,
      description,
    };
    this.setState({ loading: true });
    await updateUser(newProfile);
    this.setState({ loading: false });
    const { history } = this.props;
    history.push('/profile');
  };

  render() {
    const {
      loading,
      description,
      email,
      image,
      name,
      disableBtn,
    } = this.state;
    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">

        <Header />

        {
          loading === true ? <Loading />
            : (
              <div className="profile-edit-content">

                <form className="profile-edit-form">

                  <label>
                    Nome:
                    <input
                      value={ name }
                      data-testid="edit-input-name"
                      onChange={ this.handleChange }
                      name="name"
                      type="text"
                    />
                  </label>

                  <label>
                    Email:
                    <input
                      value={ email }
                      data-testid="edit-input-email"
                      onChange={ this.handleChange }
                      name="email"
                      type="email"
                    />
                  </label>

                  <label>
                    Descrição:
                    <input
                      value={ description }
                      data-testid="edit-input-description"
                      onChange={ this.handleChange }
                      name="description"
                      type="text"
                    />
                  </label>

                  <label>
                    Foto de perfil:
                    <input
                      value={ image }
                      data-testid="edit-input-image"
                      onChange={ this.handleChange }
                      name="image"
                      type="text"
                    />
                  </label>

                  <button
                    data-testid="edit-button-save"
                    disabled={ disableBtn }
                    onClick={ this.setNewUserProfile }
                  >
                    Salvar Perfil
                  </button>

                </form>

              </div>
            )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape(PropTypes.string.isRequired).isRequired,
};

export default ProfileEdit;

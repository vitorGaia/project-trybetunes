import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loguin';

class Profile extends React.Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    await this.fetchUser();
  }

  fetchUser = async () => {
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
  };

  render() {
    const { loading, description, email, image, name } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading === true ? <Loading />
            : (
              <div>
                <div>
                  <img
                    data-testid="profile-image"
                    alt={ name }
                    src={ image || undefined }
                  />
                  <Link
                    to="/profile/edit"
                  >
                    Editar perfil
                  </Link>
                </div>
                <p>{ name }</p>
                <p>{ email || undefined }</p>
                <p>{ description || undefined }</p>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;

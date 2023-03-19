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
                    alt={ name || 'userImage' }
                    src={ image || 'userImage' }
                  />
                </div>
                <p>{ name }</p>
                <p>{ email || 'user@email' }</p>
                <p>{ description || 'userDescription' }</p>
              </div>
            )
        }
        <Link
          to="/profile/edit"
        >
          Salvar
        </Link>
      </div>
    );
  }
}

export default Profile;

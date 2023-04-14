/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Profile.css';
import userImage from '../images/userImage2.jpg';

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
      <div data-testid="page-profile" className="page-profile">

        <Header />

        {
          loading ? <Loading /> : (
            <div className="profile-container">

              <div className="profile-content">

                <div className="profile-imagebox">
                  <img
                    className="profile-image"
                    data-testid="profile-image"
                    alt={ name || 'userImage' }
                    src={ image || userImage }
                  />
                </div>

              </div>

              <div className="edit-profile-container-link">

                <div className="profile-edit-link">
                  <Link
                    to="/project-trybetunes/profile/edit"
                    className="link-edit"
                  >
                    Editar perfil
                  </Link>
                </div>

                <div className="profile-infos-box">
                  <p>{ name }</p>
                  <p>{ email || 'user@email' }</p>
                  <p>{ description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu volutpat elit. Vivamus mattis nulla vel accumsan facilisis. Aenean sollicitudin finibus euismod. Proin pharetra lobortis tellus eleifend blandit. Pellentesque scelerisque aliquam mi nec maximus. Donec fermentum eget libero vel ornare. Praesent blandit imperdiet auctor. Duis tincidunt libero justo, a consectetur arcu fermentum molestie. Quisque congue iaculis tellus eu imperdiet. Mauris arcu justo, elementum eu ante vel, dignissim gravida ante.' }</p>
                </div>

              </div>

            </div>
          )
        }

      </div>
    );
  }
}

export default Profile;

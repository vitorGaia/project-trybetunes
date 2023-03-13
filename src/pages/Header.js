import React from 'react';
/* import { Link } from 'react-router-dom'; */
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    name: 'Carregando...',
  };

  componentDidMount() {
    this.getUserInformations();
  }

  getUserInformations = async () => {
    const { name } = await getUser();
    this.setState({ name });
  };

  render() {
    const {
      name,
    } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { name }
        </p>
      </header>
    );
  }
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from './Load';

class Header extends React.Component {
  state = {
    name: '',
  };

  async componentDidMount() {
    this.setState({
      name: await getUser(),
    });
  }

  render() {
    const { name } = this.state;
    return (
      <>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        <header
          data-testid="header-component"
        >
          {!name ? (
            <Load />
          ) : (
            <h2
              data-testid="header-user-name"
            >
              {name.name}
            </h2>
          )}
        </header>
      </>
    );
  }
}

export default Header;

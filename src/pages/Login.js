import React from 'react';
import PropTypes from 'prop-types';
import Load from '../components/Load';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    load: false,
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validText());
  };

  validText = () => {
    const { name } = this.state;
    const minLength = 3;
    if (name.length >= minLength) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  handleClick = async () => {
    const { history: { push } } = this.props;
    const { name } = this.state;
    this.setState({
      load: true,
    });
    await createUser({ name });
    push('/search');
  };

  render() {
    const { name, disabled, load } = this.state;
    return (
      <div
        data-testid="page-login"
      >
        {load && <Load />}
        <form>
          <label htmlFor="name">
            Name:
            <input
              name="name"
              type="text"
              data-testid="login-name-input"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Login
          </button>
        </form>
      </div>

    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;

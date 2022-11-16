import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artist: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validText());
  };

  validText = () => {
    const { artist } = this.state;
    const minLenght = 2;
    if (artist.length >= minLenght) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  render() {
    const { artist, disabled } = this.state;
    return (
      <div
        data-testid="page-search"
      >
        <Header />
        <form>
          <label htmlFor="artist">
            <input
              id="artist"
              name="artist"
              type="text"
              data-testid="search-artist-input"
              value={ artist }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disabled }
            >
              Procurar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;

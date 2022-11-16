import React from 'react';
import Header from '../components/Header';
import SearchAlbum from '../components/SearchAlbum';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Load from '../components/Load';

class Search extends React.Component {
  state = {
    artist: '',
    disabled: true,
    // input: '',
    load: false,
    albuns: [],
    // api: false,
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
    }
  };

  buttonSearch = async () => {
    const { artist } = this.state;
    this.setState({
      input: artist,
      artist: '',
      load: true,
    });
    const response = await searchAlbumsAPI(artist);
    this.setState({
      albuns: response,
      disabled: true,
      api: true,
      load: false,
    });
  };

  render() {
    const { artist, disabled, load, albuns, api, input } = this.state;
    return (
      <div
        data-testid="page-search"
      >
        <Header />
        {
          load
            ? <Load />
            : (
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
                    onClick={ this.buttonSearch }
                  >
                    Procurar
                  </button>
                </label>
              </form>
            )
        }

        {api && albuns.length > 0
          ? <SearchAlbum albuns={ albuns } artistName={ input } />
          : (
            <div>
              <h3>Nenhum álbum foi encontrado</h3>
            </div>
          )}
      </div>
    );
  }
}

export default Search;

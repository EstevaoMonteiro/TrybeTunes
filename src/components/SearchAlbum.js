import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchAlbum extends React.Component {
  render() {
    const { albuns, artistName } = this.props;

    return (
      <div>
        <h2>{`Resultado de álbuns de: ${artistName}`}</h2>
        <div>
          {albuns.map((item) => (
            <div key={ item.collectionId }>
              <div>
                <h2>{item.artistName}</h2>
                <p>{item.collectionName}</p>
                <Link
                  to={ `/album/${item.collectionId}` }
                  data-testid={ `link-to-album-${item.collectionId}` }
                >
                  {' '}
                  Link para Album
                  {' '}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

SearchAlbum.propTypes = {
  albuns: PropTypes.arrayOf,
}.isRequired;

export default SearchAlbum;

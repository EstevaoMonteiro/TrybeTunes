import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { sound, handleAddFavorite, tick } = this.props;
    return (
      <div>
        <h2>{sound.trackName}</h2>
        <audio data-testid="audio-component" src={ sound.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor={ sound.trackId }>
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id={ sound.trackId }
            data-testid={ `checkbox-music-${sound.trackId}` }
            onChange={ handleAddFavorite }
            checked={ tick }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  sound: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  handleAddFavorite: PropTypes.func.isRequired,
  tick: PropTypes.func.isRequired,

};

export default MusicCard;

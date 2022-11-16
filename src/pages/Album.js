import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Load from '../components/Load';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

class Album extends React.Component {
  state = {
    musicList: [],
    load: false,
    addFavorite: [],

  };

  componentDidMount() {
    this.result();
    this.loadFavoriteList();
  }

  result = async () => {
    const { match: { params: { id } } } = this.props;
    const pull = await getMusics(id);
    this.setState({
      musicList: pull,
    });
  };

  loadFavoriteList = async () => {
    this.setState({
      addFavorite: await getFavoriteSongs(),
    });
  };

  tick = (music) => {
    const { addFavorite } = this.state;
    const validateFav = addFavorite.some((song) => music.trackId === song.trackId);
    return validateFav;
  };

  handleAddFavorite = async (music) => {
    const { addFavorite } = this.state;
    const validateFav = addFavorite.some((song) => music.trackId === song.trackId);

    this.setState({
      load: true,
    });
    if (validateFav) {
      await removeSong(music);
      this.setState({
        load: false,
        addFavorite: await getFavoriteSongs(),
      });
    } else {
      await addSong(music);
      this.setState({
        addFavorite: await getFavoriteSongs(),
        load: false,
      });
    }
  };

  render() {
    const { musicList, load } = this.state;

    return (
      <div
        data-testid="page-album"
      >
        <Header />
        {
          load
            ? <Load />
            : null
        }

        <ul>
          {musicList.map((music, index) => (
            index === 0
              ? (
                <li key={ index }>
                  <h2 data-testid="artist-name">{music.artistName}</h2>
                  <h2 data-testid="album-name">{music.collectionName}</h2>
                </li>
              )
              : (
                <li key={ index }>
                  <MusicCard
                    sound={ music }
                    handleAddFavorite={ () => this.handleAddFavorite(music) }
                    tick={ this.tick(music) }
                  />
                </li>
              )
          ))}
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;

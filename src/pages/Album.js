import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
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
  }

  result = async () => {
    const { match: { params: { id } } } = this.props;
    const pull = await getMusics(id);
    this.setState({
      musicList: pull,
    });
  };

  handleAddFavorite = async (target) => {
    const { addFavorite, chosen } = this.state;
    this.setState({
      load: true,
      addFavorite: [addFavorite, target.value],
    });
    await addSong(chosen);
    this.setState({
      load: false,
    });
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
                    handleAddFavorite={ this.handleAddFavorite }
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

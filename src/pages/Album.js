import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

class Album extends React.Component {
  state = {
    musicList: [],

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

  render() {
    const { musicList } = this.state;

    return (
      <div
        data-testid="page-album"
      >
        <Header />
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
                  <MusicCard sound={ music } />
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

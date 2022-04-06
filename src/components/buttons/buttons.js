import React, { Component } from 'react';

export default class Buttons extends Component {
  state = {
    term: this.props.term,
  };

  render() {
    const { getFilmsByName, getMyRatedFilms, isRated } = this.props;
    return (
      <div className="search-buttons">
        <button
          className={!isRated ? 'button-search active' : 'button-search'}
          onClick={(e) => getFilmsByName(this.state.term)}
        >
          Search
        </button>
        <button className={isRated ? 'button-rated active' : 'button-rated'} onClick={() => getMyRatedFilms()}>
          Rated
        </button>
      </div>
    );
  }
}

import React, { Component } from 'react';

export default class Buttons extends Component {
  state = {
    term: this.props.term,
  };

  render() {
    const { getFilmsByName, getMyRatedFilms } = this.props;
    return (
      <div className="search-buttons">
        <button autoFocus className="button-search" onClick={() => getFilmsByName(this.state.term)}>
          Search
        </button>
        <button className="button-rated" onClick={() => getMyRatedFilms()}>
          Rated
        </button>
      </div>
    );
  }
}

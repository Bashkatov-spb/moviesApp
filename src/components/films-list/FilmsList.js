import React, { Component } from 'react';

import FilmsItem from '../films-item/FilmsItem';

export default class FilmsList extends Component {
  state = {
    genres: [],
  };

  componentDidMount() {
    this._isMounted = true;
    this.props.getGenres().then((res) => this.setState({ genres: res.genres }));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { dataFilms, guestId, ratingArr } = this.props;
    return (
      <div className="films-list">
        {dataFilms !== undefined &&
          dataFilms.map((element) => (
            <FilmsItem
              key={element.id}
              filmData={element}
              genres={this.state.genres}
              guestId={guestId}
              ratingArr={ratingArr}
            />
          ))}
      </div>
    );
  }
}

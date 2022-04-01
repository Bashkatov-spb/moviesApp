import React, { Component } from 'react';

export default class FilmGenres extends Component {
  render() {
    const { genre_ids, genres } = this.props;
    return (
      <div className="films-genres">
        {genres.map((item) =>
          genre_ids.map(
            (genre) =>
              genre === item.id && (
                <div key={item.id} className="film-genre">
                  {item.name}
                </div>
              )
          )
        )}
      </div>
    );
  }
}

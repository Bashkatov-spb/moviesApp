import React, { Component } from 'react';

import GenresContext from '../../API/GenresContext';

export default class FilmGenres extends Component {
  render() {
    const { genre_ids } = this.props;
    const genr = [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' },
      { id: 14, name: 'Fantasy' },
      { id: 36, name: 'History' },
      { id: 27, name: 'Horror' },
      { id: 10402, name: 'Music' },
      { id: 9648, name: 'Mystery' },
      { id: 10749, name: 'Romance' },
      { id: 878, name: 'Science Fiction' },
      { id: 10770, name: 'TV Movie' },
      { id: 53, name: 'Thriller' },
      { id: 10752, name: 'War' },
      { id: 37, name: 'Western' },
    ];
    return (
      <GenresContext.Consumer>
        {({ genres }) => (
          <div className="films-genres">
            {console.log(genres)}
            {genr.map((item) =>
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
        )}
      </GenresContext.Consumer>
    );
  }
}

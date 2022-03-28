import React, { useState } from 'react';
import { format } from 'date-fns/esm';
import { Rate } from 'antd';

import FilmGenres from '../film-genres/FilmGenres';
import 'antd/dist/antd.css';

const FilmsItem = ({ filmData }) => {
  const [rating, setRating] = useState(0);
  const { title, release_date, genre_ids, genres, poster_path, overview, vote_average } = filmData;
  const genre = [];
  const vote = vote_average;
  let colour = '';

  if (vote >= 0 && vote < 3) {
    colour = '#E90000';
  }
  if (vote >= 3 && vote < 5) {
    colour = '#E97E00';
  }
  if (vote >= 5 && vote < 7) {
    colour = '#E9D100';
  }
  if (vote > 7) {
    colour = '#66E900';
  }

  if (genres !== undefined) {
    genres.map((item) => genre.push(item.id));
  }
  const date = release_date && format(new Date(release_date), 'MMMM d, yyyy');
  const arr = overview.split(' ');
  let rate = rating;
  let str = '';
  let img =
    poster_path !== null
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : 'https://img.freepik.com/free-vector/404-error-page-not-found_41910-343.jpg';

  for (let i = 0; i < 15; i++) {
    str += arr[i] + ' ';
  }

  if (localStorage.getItem(filmData.id)) {
    rate = localStorage.getItem(filmData.id);
  }

  const writeRateFilm = (rating) => {
    setRating(rating);
    localStorage.setItem(filmData.id, rating);
  };

  return (
    <div className="film-item">
      <div className="film-container">
        <div className="film-img">
          <img src={img} alt=""></img>
        </div>
        <div className="film-info">
          <div className="film-header">
            <h2 className="film-title">{title}</h2>
            <div style={{ border: `2px solid ${colour}` }} className="film-rating">
              {vote_average}
            </div>
          </div>
          <p className="film-date">{date}</p>
          <FilmGenres genre_ids={genre_ids ? genre_ids : genre} />
        </div>
        <div className="film-description">
          <span>{str + '...'}</span>
        </div>
        <Rate
          style={{ fontSize: '17px' }}
          count={10}
          allowHalf
          value={Number(rate)}
          onChange={(number) => writeRateFilm(number)}
        />
      </div>
    </div>
  );
};

export default FilmsItem;

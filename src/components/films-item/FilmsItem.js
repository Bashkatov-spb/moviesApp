import React, { useState } from 'react';
import { format } from 'date-fns/esm';
import { Rate } from 'antd';

import SwapiService from '../../API/PostService';
import FilmGenres from '../film-genres/FilmsGenres';
import 'antd/dist/antd.css';

const FilmsItem = ({ filmData, guestId, genres }) => {
  const swapiService = new SwapiService();
  const [rate, setRate] = useState(0);
  const { title, release_date, genre_ids, poster_path, overview, vote_average, rating, id } = filmData;
  let colour = '';

  if (vote_average >= 0 && vote_average < 3) {
    colour = '#E90000';
  }
  if (vote_average >= 3 && vote_average < 5) {
    colour = '#E97E00';
  }
  if (vote_average >= 5 && vote_average < 7) {
    colour = '#E9D100';
  }
  if (vote_average > 7) {
    colour = '#66E900';
  }

  const date = release_date && format(new Date(release_date), 'MMMM d, yyyy');
  const arr = overview.split(' ');
  let str = '';
  let img =
    poster_path !== null
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : 'https://img.freepik.com/free-vector/404-error-page-not-found_41910-343.jpg';

  for (let i = 0; i < 15; i++) {
    str += arr[i] + ' ';
  }

  const rateFilm = (rating) => {
    swapiService.rateFilm(rating, guestId, id);
    setRate(rating);
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
          <FilmGenres genres={genres} genre_ids={genre_ids} />
        </div>
        <div className="film-description">
          <span>{str + '...'}</span>
        </div>
        <Rate
          style={{ fontSize: '17px' }}
          count={10}
          allowHalf
          value={Number(rating ? rating : rate)}
          onChange={(number) => rateFilm(number)}
        />
      </div>
    </div>
  );
};

export default FilmsItem;

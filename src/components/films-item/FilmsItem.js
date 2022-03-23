import React from 'react';
import { format } from 'date-fns/esm';
import FilmGenres from '../film-genres/FilmGenres';
import { Rate } from 'antd';
import 'antd/dist/antd.css';

const FilmsItem = ({filmData, dataGenres}) => {
  const {title, release_date, genre_ids, poster_path, overview, vote_average} = filmData;
  const date = release_date && format(new Date(release_date), "MMMM d, yyyy");
  
  const rounded = (number) => {
    let res = number - Math.floor(number);
    if (res >= 0.3) {
      return Math.floor(number) + 0.5;
    } 
    return Math.floor(number);
  }

  const vote = rounded(vote_average);

  return (
    <div className="film-item">
      <div className="film-container">
        <div className="film-img">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt=""></img>
        </div>
        <div className="film-info">
          <div className="film-header">
            <h2 className="film-title">{title}</h2>
            <div className="film-rating">{vote_average}</div>
          </div>
          <p className="film-date">{date}</p>
          <FilmGenres genre_ids={genre_ids} dataGenres={dataGenres}/>
        </div>
        <div className="film-description">
            <span>{overview}</span>
          </div>
          <Rate style={{fontSize: "17px"}} count={10} allowHalf disabled defaultValue={vote}/>
      </div>
    </div>
  )
}

export default FilmsItem;

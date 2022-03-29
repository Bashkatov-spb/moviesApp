import React from 'react';
let genres = [];

const getGenres = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=e3e2598535421797b16e6b080cd5b8a6&language=en-US'
  );
  genres = await res.json();
  return genres;
};
getGenres();
const GenresContext = React.createContext(genres);

export default GenresContext;

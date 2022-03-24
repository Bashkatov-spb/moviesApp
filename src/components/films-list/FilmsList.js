import React from 'react';

import FilmsItem from '../films-item/FilmsItem';

const FilmsList = ({ dataFilms, dataGenres }) => {
  return (
    <div className="films-list">
      {dataFilms !== undefined &&
        dataFilms.map((element) => <FilmsItem key={element.id} filmData={element} dataGenres={dataGenres} />)}
    </div>
  );
};

export default FilmsList;

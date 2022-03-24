import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';

import SearchInput from '../search/SearchInput';
import FilmsList from '../films-list/FilmsList';
import Spinner from '../spinner/spinner';
import SwapiService from '../../API/PostService';
import './app.css';
import ErrorIndicator from '../error-indicator/ErrorIndicator';

const App = () => {
  const swapiService = new SwapiService();

  const [page, setPage] = useState(1);
  const [dataFilms, setDatafilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rated, setRated] = useState(false);
  const [term, setTerm] = useState('');
  const [findFilms, setFindFilms] = useState(false);
  const [totalResults, setTotalResults] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    getFilmsByName('return');
  }, []);

  const getTopRatedFilms = async (page = 1) => {
    const res = await swapiService.fetchTopRatedFilms(page);
    setDatafilms(res.results);
    setRated(true);
    setLoading(false);
    setPage(page);
    setTotalResults(res.total_results);
  };

  const getFilmsByName = async (name, page = 1) => {
    console.log(name);
    if (name.trim() !== '') {
      const res = await swapiService.searchFilms(name, page);
      setDatafilms(res.results);
      setLoading(false);
      setFindFilms(true);
      setPage(page);
      setTotalResults(res.total_results);
    } else {
      setLoading(true);
      setFindFilms(false);
      setDatafilms([]);
      setTotalResults(1);
    }
  };

  const onError = (err) => {
    setError(true);
  };

  const onSearchChange = (term) => {
    setTerm(term);
  };

  const updatePageNumber = (number) => {
    if (rated) {
      return getTopRatedFilms(number);
    }
    if (findFilms) {
      return getFilmsByName(term, number);
    }
  };

  const search = (films, term) => {
    if (term.length === 0) {
      return films;
    }
    return films.filter((film) => {
      return film.title.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  const visibleFilms = search(dataFilms, term);

  return (
    <div className="container">
      <div className="search-buttons">
        <button autoFocus className="button-search" onClick={() => getFilmsByName('return')}>
          Search
        </button>
        <button className="button-rated" onClick={() => getTopRatedFilms()}>
          Rated
        </button>
      </div>
      <SearchInput onChange={getFilmsByName} />
      {error && <ErrorIndicator />}
      {loading && <Spinner />}
      <FilmsList dataFilms={visibleFilms} />
      <Pagination
        className="films-pagination"
        onChange={(choosePage) => updatePageNumber(choosePage)}
        current={page}
        total={loading ? 1 : totalResults}
        showSizeChanger={false}
        responsive={true}
      />
    </div>
  );
};

export default App;

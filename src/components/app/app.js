import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import _, { debounce } from 'lodash';
import axios from 'axios';

import ErrorIndicator from '../error-indicator/ErrorIndicator';
import SearchInput from '../search/SearchInput';
import FilmsList from '../films-list/FilmsList';
import Spinner from '../spinner/spinner';
import SwapiService from '../../API/PostService';
import './app.css';

const App = () => {
  const swapiService = new SwapiService();

  const [page, setPage] = useState(1);
  const [dataFilms, setDatafilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rated, setRated] = useState(false);
  const [term, setTerm] = useState('return');
  const [findFilms, setFindFilms] = useState(false);
  const [totalResults, setTotalResults] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    getFilmsByName(term);
  }, [term]);

  /* const vot = {
    value: 8.5,
  };

  const apiKey = 'e3e2598535421797b16e6b080cd5b8a6';

  const autorization = async () => {
    const guestSession = await axios.get(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`
    );
    const guestSessionId = guestSession.data.guest_session_id;
    const response1 = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`);
    const requestToken = response1.data.request_token;
    const rt = {
      request_token: requestToken,
    };
    const rtS = JSON.stringify(rt);
    const response3 = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, {
      rtS,
    });
    console.log(requestToken);
    /* const response2 = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, {
      rtS,
    });
    const sessionId = response2.data.request_token;
    const createSession = await axios.post(
      `https://api.themoviedb.org/3/movie/47971/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`,
      {
        headers: 'application/json;charset=utf-8',
        body: JSON.stringify(vot),
      }
    );
  }; */

  const getMyRatedFilms = async (page = 1) => {
    const res = [];
    const filmsArr = [];
    setTerm('');
    for (let i = 0; i < localStorage.length; i++) {
      filmsArr.push(localStorage.key(i));
    }
    for (const item of filmsArr) {
      res.push(await swapiService.getFilmById(item));
    }
    setPage(page);
    setRated(true);
    setDatafilms(res);
    setTotalResults(res.length);
  };

  const getFilmsByName = async (name, page = 1) => {
    setLoading(true);
    if (name.trim() !== '') {
      const res = await swapiService.searchFilms(name, page);
      setRated(false);
      setDatafilms(res.results);
      setLoading(false);
      setFindFilms(true);
      setPage(page);
      setTotalResults(res.total_results);
    } else {
      setLoading(false);
      setFindFilms(false);
      setDatafilms([]);
      setTotalResults(1);
    }
  };

  const updatePageNumber = (number) => {
    if (rated) {
      return getMyRatedFilms(number);
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

  const debounceSearch = debounce((term) => {
    setTerm(term);
  }, 1000);

  const visibleFilms = search(dataFilms, term);
  const isVisible = !error && !loading ? true : false;
  const showWarning = visibleFilms.length === 0 && !loading;

  return (
    <div className="container">
      <div className="search-buttons">
        <button autoFocus className="button-search" onClick={() => getFilmsByName(term)}>
          Search
        </button>
        <button className="button-rated" onClick={() => getMyRatedFilms()}>
          Rated
        </button>
      </div>
      <SearchInput onSearchChange={debounceSearch} />
      {showWarning && !loading ? <ErrorIndicator /> : null}
      {loading ? <Spinner /> : <FilmsList dataFilms={visibleFilms} />}
      {isVisible && (
        <Pagination
          className="films-pagination"
          onChange={(choosePage) => updatePageNumber(choosePage)}
          current={page}
          total={visibleFilms.length < 20 ? visibleFilms.length : totalResults}
          showSizeChanger={false}
          responsive={true}
        />
      )}
    </div>
  );
};

export default App;

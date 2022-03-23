import { Pagination } from 'antd';
import SearchInput from '../search/SearchInput';
import React, { Component, useState } from 'react';
import FilmsList from '../films-list/FilmsList';
import Spinner from '../spinner/spinner';
import './app.css';

const App = () => {

  const [page, setPage] = useState(1);
  const [dataFilms, setDatafilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rated, setRated] = useState(false);
  const [term, setTerm] = useState('');
  const [findFilms, setFindFilms] = useState(false);
  const [totalResults, setTotalResults] = useState(1);

  const fetchFilms = async (currentPage = 1) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e3e2598535421797b16e6b080cd5b8a6&language=en-US&page=${currentPage}`);
    const data = await response.json();
    setDatafilms(data.results);
    setLoading(false);
    setRated(false);
    setPage(currentPage);
    setTotalResults(data.total_results);
  }
  
  const fetchTopRatedFilms = async (currentPage = 1) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=e3e2598535421797b16e6b080cd5b8a6&language=en-US&page=${currentPage}`);
    const data = await response.json();
    setDatafilms(data.results);
    setRated(true);
    setLoading(false);
    setPage(currentPage);
    setTotalResults(data.total_results);
  }
  
  const searchFilms = async(searchName, currentPage = 1) => {
    if (searchName.trim() !== '') {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e3e2598535421797b16e6b080cd5b8a6&language=en-US&query=${searchName}&page=${currentPage}&include_adult=false`);
      const data = await response.json();
      console.log(searchName)
      setLoading(false);
      setFindFilms(true);
      setDatafilms(data.results);
      setTotalResults(data.total_results);
    } else {
      setLoading(true);
      setFindFilms(false);
      setDatafilms([]);
      setTotalResults(1);
    }
  }

  const updatePageNumber = (number) => {
    if (rated) {
      return fetchTopRatedFilms(number);
    } 
    if (!rated) {
      return fetchFilms(number);
    }
    if (findFilms) {
      return searchFilms(number);
    }
  }

  const search = (films, term) => {
  
    if (term.length === 0) {
      return films;
    }
  
    return films.filter((film) => {
      return film.title.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  const onSearchChange = (term) => {
    setTerm(term);
  }

  const visibleFilms = search(dataFilms, term);

  return (
    <div className="container">
      <div className="search-buttons">
        <button 
          className="button-search"
          onClick={() => fetchFilms()}
          >Search</button>
        <button 
          className="button-rated"
          onClick={() => fetchTopRatedFilms()}
          >Rated</button>
      </div>
      <SearchInput 
        onChange={searchFilms}
        onSearchChange={onSearchChange}
      />
      {loading && <Spinner />}
      <FilmsList dataFilms={visibleFilms} />
      <Pagination 
        onChange={(choosePage) => updatePageNumber(choosePage)} 
        current={page}
        total={loading ? 1 : totalResults} 
        className="films-pagination" 
        showSizeChanger={false}
        responsive={true}
        />
    </div>
  );
}

export default App;
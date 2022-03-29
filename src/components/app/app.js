import { Pagination } from 'antd';
import React, { Component } from 'react';
import { debounce } from 'lodash';

import ErrorIndicator from '../error-indicator/ErrorIndicator';
import SearchInput from '../search/SearchInput';
import FilmsList from '../films-list/FilmsList';
import Spinner from '../spinner/spinner';
import SwapiService from '../../API/PostService';
import './app.css';
import Buttons from '../buttons/buttons';
const GenresContext = React.createContext();

export default class App extends Component {
  state = {
    page: 1,
    dataFilms: [],
    loading: true,
    term: 'return',
    findFilms: false,
    totalResults: 1,
    error: false,
    sessionId: '',
    isRated: false,
    genres: [],
  };
  swapiService = new SwapiService();

  componentDidMount() {
    this.getFilmsByName('return');
    this.authentication();
    this.getAllgenres();
  }

  authentication = () => {
    this.swapiService.guestSession().then((res) => {
      this.setState({
        sessionId: res.guest_session_id,
      });
    });
  };

  getAllgenres = () => {
    this.swapiService.getGenres().then((res) => {
      this.setState({
        genres: res,
      });
    });
  };

  getMyRatedFilms = async () => {
    this.swapiService.getRatedFilms(this.state.sessionId).then((res) => {
      this.setState({
        dataFilms: res.results,
        isRated: true,
      });
    });
  };

  getFilmsByName = async (name, page = 1) => {
    if (name.trim() !== '') {
      const res = await this.swapiService.searchFilms(name, page);
      this.setState({
        dataFilms: res.results,
        loading: false,
        findFilms: true,
        page: page,
        totalResults: res.total_results,
        isRated: false,
      });
    } else {
      this.setState({
        dataFilms: [],
        loading: true,
        findFilms: false,
        totalResults: 1,
      });
    }
  };

  updatePageNumber = (number) => {
    if (this.state.rated) {
      return this.getMyRatedFilms(number);
    }
    if (this.state.findFilms) {
      return this.getFilmsByName(this.state.term, number);
    }
  };

  search = (films, term) => {
    if (term.length === 0) {
      return films;
    }
    return films.filter((film) => {
      return film.title.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  debounceSearch = debounce((term) => {
    this.setState({
      term: term,
    });
    this.getFilmsByName(term);
  }, 1000);

  render() {
    const { dataFilms, term, loading, totalResults, error, sessionId, page, isRated } = this.state;
    const visibleFilms = this.search(dataFilms, term);
    const isVisible = !error && !loading ? true : false;
    const showWarning = visibleFilms.length === 0 && !loading;

    return (
      <div className="container">
        <Buttons getMyRatedFilms={this.getMyRatedFilms} getFilmsByName={this.getFilmsByName} term={term} />
        {!isRated && <SearchInput onSearchChange={this.debounceSearch} />}
        {showWarning && !loading ? <ErrorIndicator /> : null}
        <GenresContext.Provider value={this.state.genres}>
          {loading ? <Spinner /> : <FilmsList dataFilms={visibleFilms} guestId={sessionId} />}
        </GenresContext.Provider>
        {isVisible && (
          <Pagination
            className="films-pagination"
            onChange={(choosePage) => this.updatePageNumber(choosePage)}
            current={page}
            total={visibleFilms.length < 20 ? visibleFilms.length : totalResults}
            showSizeChanger={false}
            responsive={true}
          />
        )}
      </div>
    );
  }
}

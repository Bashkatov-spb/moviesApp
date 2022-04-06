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
import { SwapiServiceConsumer, SwapiServiceProvider } from '../../API/SwapiServiceContext';

export default class App extends Component {
  _isMounted = false;

  state = {
    page: 1,
    dataFilms: [],
    loading: true,
    term: 'return',
    findFilms: false,
    totalResults: 1,
    sessionId: '',
    isRated: false,
    error: false,
  };
  swapiService = new SwapiService();

  componentDidMount() {
    this._isMounted = true;
    this.getFilmsByName('return');
    this.authentication();
    localStorage.clear(); // <------ Не знаю, нужно ли чистить локал сторэдж, решил оставить
  }

  authentication = () => {
    this.swapiService.guestSession().then((res) => {
      this.setState({
        sessionId: res.guest_session_id,
      });
    });
  };

  getMyRatedFilms = (page = 1) => {
    this.swapiService
      .getRatedFilms(this.state.sessionId, page)
      .then((res) => {
        this.setState({
          dataFilms: res.results,
          isRated: true,
          totalResults: res.total_results,
          page: page,
        });
      })
      .catch((e) => this.onError(e));
  };

  getFilmsByName = (name, page = 1) => {
    if (name.trim() !== '') {
      this.swapiService
        .searchFilms(name, page)
        .then((res) => {
          this.setState({
            dataFilms: res.results,
            loading: false,
            findFilms: true,
            page: page,
            totalResults: res.total_results,
            isRated: false,
          });
        })
        .catch((e) => this.onError(e));
    } else {
      this.setState({
        dataFilms: [],
        loading: false,
        findFilms: false,
        totalResults: 1,
      });
    }
  };

  updatePageNumber = (number) => {
    if (this.state.isRated) {
      return this.getMyRatedFilms(number);
    }
    if (this.state.findFilms) {
      return this.getFilmsByName(this.state.term, number);
    }
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  debounceSearch = debounce((term) => {
    this.setState({
      term: term,
    });
    this.getFilmsByName(term);
  }, 1000);

  render() {
    const { dataFilms, term, loading, totalResults, sessionId, page, isRated, error } = this.state;
    const hasData = !(loading || error);
    const showWarningMessage =
      dataFilms.length === 0 && !loading && !error ? <h1 style={{ margin: '20px' }}>Film is not found!</h1> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const searchPanel = !isRated && <SearchInput onSearchChange={this.debounceSearch} />;
    const spinner = loading ? <Spinner /> : null;
    const pagination = hasData && (
      <Pagination
        className="films-pagination"
        onChange={(choosePage) => this.updatePageNumber(choosePage)}
        current={page}
        defaultPageSize={20}
        total={totalResults}
        showSizeChanger={false}
        responsive={true}
      />
    );
    return (
      <div className="container">
        <SwapiServiceProvider value={this.swapiService}>
          <Buttons
            getMyRatedFilms={this.getMyRatedFilms}
            getFilmsByName={this.getFilmsByName}
            isRated={isRated}
            term={term}
          />
          {searchPanel}
          {errorMessage}
          {showWarningMessage}
          {spinner}
          <SwapiServiceConsumer>
            {({ getGenres }) =>
              hasData ? <FilmsList getGenres={getGenres} dataFilms={dataFilms} guestId={sessionId} /> : null
            }
          </SwapiServiceConsumer>
          {pagination}
        </SwapiServiceProvider>
      </div>
    );
  }
}

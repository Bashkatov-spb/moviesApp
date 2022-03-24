import React, { Component } from 'react';

export default class SearchInput extends Component {
  state = {
    term: '',
  };

  searchFilms = (e) => {
    console.log(this.props.term);
    const term = e.target.value;
    this.setState({ term });
    this.props.onChange(term);
  };

  render() {
    return (
      <input
        className="film-search"
        type="text"
        placeholder="Type to search..."
        value={this.state.term}
        onChange={this.searchFilms}
      ></input>
    );
  }
}

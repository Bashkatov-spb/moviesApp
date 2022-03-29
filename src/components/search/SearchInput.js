import React, { Component } from 'react';

export default class SearchInput extends Component {
  state = {
    term: '',
  };

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  render() {
    return (
      <input
        className="film-search"
        type="text"
        placeholder="Type to search..."
        value={this.state.term}
        onChange={this.onSearchChange}
      ></input>
    );
  }
}

import React, { Component } from "react";
import { LocaleConsumer } from "../contexts/LocaleContext";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onKeywordChange = this.onKeywordChange.bind(this);
  }

  onKeywordChange(event) {
    this.props.keywordChange(event.target.value);
  }

  render() {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <div className="search-bar">
              <input
                
                type="text"
                placeholder={
                  locale === "id" ? "Cari Berdasarkan judul" : "Search by title"
                }
                value={this.props.keyword}
                onChange={this.onKeywordChange}
              />
            </div>
          );
        }}
      </LocaleConsumer>
    );
  }
}

export default SearchBar;

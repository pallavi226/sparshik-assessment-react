import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DebounceInput from 'react-debounce-input'
import BookShelf from './BookRoom'

class SearchBook extends Component {
    componentDidMount() {
        this.props.emptybooks()
    }
    render() {
     
        return <div className="search-books">
            <div className="search-books-bar">


                <Link
                    className="close-search"
                    to="/">
                    Close
                    </Link>
                <div className="search-books-input-wrapper">
                    <DebounceInput
                        debounceTimeout={200}
                        element="input"
                        type="text"
                        value={this.props.books.string}
                        onChange={this.props.searchQuery}
                        placeholder="Search the books"
                    />

                </div>
            </div>
            <div className="search-results">
                <BookShelf updateShelf={this.props.updateShelf} shelf="Search Results" books={this.props.books} />
            </div>
        </div>
    };
};

export default SearchBook;
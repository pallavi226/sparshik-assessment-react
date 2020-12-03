import React, { Component } from 'react';

class BookRoom extends Component {
    render() {
        return <div className="BookRoom">
            <h2 className="BookRoom-title">{this.props.shelf}</h2>
            <div className="BookRoom-books">
                <ol className="books-grid">
                    {Array.isArray(this.props.books) && (
                        this.props.books.map((book, index) =>
                        <li key={index}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 150, height: 150, backgroundImage: book.imageLinks ? (`url(${book.imageLinks.thumbnail})`) : (`url(https://dummyimage.com/150x150/000/797a85&text=thumbnail)`) }}></div>
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={(event) => this.props.updateShelf(book, event.target.value)}> 
                                            <option disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', '): ''}</div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    }
}

export default BookRoom;
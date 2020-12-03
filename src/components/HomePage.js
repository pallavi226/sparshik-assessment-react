import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookRoom'




class HomePage extends Component {


    render() {
        return <div className="books-list">
            <div className="books-list-title">
                <h1>Reading Books</h1>
            </div>
            <div className="books-list-content">
			    <BookShelf updateShelf={this.props.updateShelf} shelf="Read" books={this.props.books.filter(book => book.shelf === 'read')} />
				 </div>
				 
				 <div className="books-list-content">
                <BookShelf updateShelf={this.props.updateShelf} shelf="Currently Reading" books={this.props.books.filter(book => book.shelf === 'currentlyReading')} />,
				 </div>
				 
				 <div className="books-list-content">
                <BookShelf updateShelf={this.props.updateShelf} shelf="Want to Read" books={this.props.books.filter(book => book.shelf === 'wantToRead')} />,
               
            </div>


            <div className="open-search">
			
                <Link
                    to="/search">
                   Search a Intersting book
                </Link>
				  
            </div>

        </div>
	
    }
	
	
	
}



export default HomePage;
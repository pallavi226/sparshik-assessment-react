import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import HomePage from './components/HomePage'
import SearchBook from './components/search'
import './css/App.css'



class App extends React.Component {
    state = {
		findbooks: [],
        BookReading: [],
        
    }

    componentDidMount() {
        BooksAPI.getAll().then(BookReading => {
            this.setState({ BookReading })
        })
    }
    emptybooks = () => this.setState({ findbooks : []})

    searchQuery = (event) => {
        const query = event.target.value
        if (query !== '') { 
          BooksAPI.search(query).then(searchResults => {
            if (!searchResults || searchResults.error) {
              this.setState({ findbooks: [] })
              return
            }
          
            const adjustedBooks = searchResults.map(searchResult => {
                this.state.BookReading.forEach(book => {
                if (book.id === searchResult.id) searchResult.shelf = book.shelf
              })
              return searchResult
            })
      
           
            this.setState({ findbooks: adjustedBooks })
      
          })
        } else {
            this.setState({ findbooks: [] })
        }
      }

    updateShelf = (book, shelf) => {
        
        if (shelf === 'none') {
            this.setState(prevState => ({
                BookReading: prevState.BookReading.filter(b => b.id !== book.id),
            }))
        }

        if (book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(() => {
                const { BookReading, findbooks } = this.state
                const BookReadingIds = BookReading.map(b => b.id)
                const findbooksIds = BookReading.map(b => b.id)
                let readingBooks = [] 
                let newfindbooks = []

                if (BookReadingIds.includes(book.id) || findbooksIds.includes(book.id)) {
                    readingBooks = BookReading.map(b => b.id === book.id ? { ...b, shelf } : b)
                    newfindbooks = findbooks.map(b => b.id === book.id ? { ...b, shelf } : b)

                } else {
                    book.shelf = shelf
                    readingBooks = [...BookReading, book]
                    newfindbooks = [...findbooks, book]
                }
                this.setState({ BookReading: readingBooks, findbooks: newfindbooks })

            })
        }
    }


    render() {
        return (
            <div className="bookread">
                <Route path="/search" exact render={() => (
                    <SearchBook emptybooks={this.emptybooks} searchQuery={this.searchQuery} updateShelf={this.updateShelf} books={this.state.findbooks} />
                )} />
                <Route path="/" exact render={() => (
                    <HomePage updateShelf={this.updateShelf} books={this.state.BookReading} />
                )} />

            </div>
        )
    }
}

export default App
import { 
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import {useState} from 'react';

import InitialPage from "./pages/InitialPage";
import DetailPage from "./pages/DetailPage";

function App() {

  const [favoriteBooks, setFavoriteBooks] = useState([]);

  const addFavoriteBook = (id, title, imgBook, authors, isbn) => {
    const newBook = [...favoriteBooks, { 
      id: id, 
      title: title,
      imgBook: imgBook,
      authors: authors,
      isbn: isbn,
    }];
    setFavoriteBooks(newBook);
  }

  const deleteFavoriteBook = (id) => {
    const newBook = favoriteBooks.filter(favBook => favBook.id !== id)
    setFavoriteBooks(newBook);
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <InitialPage addFavoriteBook={addFavoriteBook} deleteFavoriteBook={deleteFavoriteBook} favoriteBooks={favoriteBooks}/>}/>
        <Route path="/Detail/:id" exact component={DetailPage} />
      </Switch>
    </Router>
  );
}

export default App;

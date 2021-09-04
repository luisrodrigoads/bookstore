import axios from "axios";
import { useState } from "react";
import {useHistory } from "react-router-dom";
import Book from "../components/Book";
import "../styles/App.css";

function InitialPage({addFavoriteBook, deleteFavoriteBook, favoriteBooks}) {

  const history = useHistory();

  const [inputText, setInputText] = useState('');

  const [title, setTitle] = useState('');
  const [imgBook, setImgBook] = useState('');
  const [authors, setAuthors] = useState([]);
  const [isbnBook, setIsbnBook] = useState([]);

  const searchBookFromApi = (id) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${id}`)
      .then(res => res.data)
      .then(result => {
        setImgBook(result.items[0].volumeInfo.imageLinks.smallThumbnail);
        setTitle(result.items[0].volumeInfo.title);
        setAuthors(result.items[0].volumeInfo.authors);
        setIsbnBook(result.items[0].volumeInfo.industryIdentifiers);
    
        setInputText('');
      }).catch(() => {
        setTitle('');
        setImgBook('');
        setAuthors([]);
        setIsbnBook([]);
  
        setInputText('');
        alert('Livro não encontrado');
      })
      
  }

  const searchTitleBookFromApi = (titleSearch) => {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${titleSearch}`)
      .then(res => res.data)
      .then(result => {
        setImgBook(result.items[0].volumeInfo.imageLinks.smallThumbnail);
        setTitle(result.items[0].volumeInfo.title);
        setAuthors(result.items[0].volumeInfo.authors);
        setIsbnBook(result.items[0].volumeInfo.industryIdentifiers);
    
        setInputText('');
      }).catch(() => {
        setTitle('');
        setImgBook('');
        setAuthors([]);
        setIsbnBook([]);

        setInputText('');
        alert('Livro não encontrado');
      })

    }

  const handleAddFavorite = (id, title, imgBook, authors, isbn) => {
    
    addFavoriteBook(id, title, imgBook, authors, isbn);
  }

  const handleDeleteFavorite = (id) => {
    deleteFavoriteBook(id);
  }

  return (
    <div className="App">
      <header className="header-initial-page">
        <p>Consultar Livros</p>
        <div className="search">
          <p>Digite o ISBN: </p>
          <input type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} />
  
        </div>
        
        <div className="headers-buttons">
            <button
              type="submit"
              onClick={() => inputText ? searchBookFromApi(inputText) : alert('Preencha o campo')}
            >
              Consultar por isbn
            </button>

            <button
              type="submit"
              onClick={() => inputText ? searchTitleBookFromApi(inputText) : alert('Preencha o campo')}
            >
              Consultar por titulo
            </button>

            {title.length > 0 ? (
                <button
                  type="submit"
                  className="btn-ver-favoritos"
                  onClick={() => handleAddFavorite(isbnBook[0].identifier, title, imgBook, authors, isbnBook)}
                >
                  Adicionar aos favoritos
                </button>
            ): null}
          </div>
      </header>
      <main>
        {
          title ? (
            <>
              <Book imgBook={imgBook} title={title} isbnBook={isbnBook} authors={authors} />
            </>
          )
          : null
        }

              {favoriteBooks.length > 0 ? (
                <>
                <div className="favorites-title">
                  <p>Livros Favoritos</p>
                </div>

                {
                  favoriteBooks.map((favorite, index) => {
                    return(
                    <section key={index}  className="book-resume-data-section">
                      <p><b>Titulo:</b> {favorite.title}</p>
                      <p><b>Autores:</b> {favorite.authors.map((a, index) => {return a + ' '})}</p>
                      
                      <div className="footer-favorite-book-resume">
                            <button
                              className="btn-ver-favoritos"
                              style={{ backgroundColor:'red',marginLeft: 0 }}
                              onClick={() => handleDeleteFavorite(favorite.id)}
                            >
                              Excluir
                            </button>
                          
                            
                            <button
                              className="btn-ver-favoritos"
                              onClick={() => history.push(`/Detail/${favorite.id}`,{from: '/'})}
                            >
                              Ver detalhes
                            </button>
                            
                      </div> 
                    </section>
                    );
                  })
                }
                
                </>
              ) : null
        }

        
      </main>
    </div>
  );
}

export default InitialPage;
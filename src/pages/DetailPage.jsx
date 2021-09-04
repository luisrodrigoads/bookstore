import { useEffect, useState } from "react";
import axios from "axios";

import '../styles/BookPage.css';

function DetailPage(props) {

    const [title, setTitle] = useState('');
    const [imgBook, setImgBook] = useState('');
    const [authors, setAuthors] = useState([]);
    const [isbnBook, setIsbnBook] = useState([]);
    const [description, setDescription] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [publisher, setPublisher] = useState('');
    const [pageCount, setPageCount] = useState('');
    const [language, setLanguage] = useState('');

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${props.match.params.id}`)
        .then(res => res.data)
        .then(result => {
          setImgBook(result.items[0].volumeInfo.imageLinks.smallThumbnail);
          setTitle(result.items[0].volumeInfo.title);
          setAuthors(result.items[0].volumeInfo.authors);
          setIsbnBook(result.items[0].volumeInfo.industryIdentifiers);
          setDescription(result.items[0].volumeInfo.description);
          setPublishedDate(result.items[0].volumeInfo.publishedDate);
          setPublisher(result.items[0].volumeInfo.publisher);
          setPageCount(result.items[0].volumeInfo.pageCount);
          setLanguage(result.items[0].volumeInfo.language);
        
        }).catch(() => {
          
        })
    },[props]);

    return(
        <div>
            <header className="header-detail">
                <div>
                    <p>Detalhes do livro</p>
                </div>
            </header>
            <main>
                <section className="book-section-all-info">
                    <p className="title">{title}</p>
                    <div className="imgbook">
                        <img alt="" src={imgBook}/>
                    </div>
                    <div >
                        <p><b>Descrição:</b> {description}</p>
                        <p><b>Autores:</b> {authors.map((a, index) => {return a + ' '})}</p>
                        {isbnBook.map((i, index) => {
                            return  <p key={index}><b>{i.type}:</b> {i.identifier}</p> ;
                        })}
                        <p><b>Ano de Publicação:</b> {publishedDate}</p>
                        <p><b>Editora:</b> {publisher}</p>
                        <p><b>Páginas:</b> {pageCount}</p>
                        <p><b>Linguagem:</b> {language}</p>
                    </div>
                    
                </section>
            </main>
        </div>    
    );
}

export default DetailPage;
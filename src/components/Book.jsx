import React from 'react';

import "../styles/BookDetail.css";

export default function Book (props) {

    const {imgBook, title, authors, isbnBook} = props;

    return(
        <section className="book-detail">
            <div className="head-section">
                <div>
                    <p>Dados do livro:</p>
                </div>
            </div> 
            <div>
                <img className="book-img" alt="" src={imgBook} />
                <div className="book-text-detail">
                    <p><b>Titulo:</b> {title}</p>
                    <p><b>Autores:</b> {authors.map((a, index) => {return a + ' '})}</p>
                    {isbnBook.map((i, index) => {
                      return  <p key={index}><b>{i.type}:</b> {i.identifier}</p> ;
                    })}  
                </div>
            </div>
        </section>
    );
}
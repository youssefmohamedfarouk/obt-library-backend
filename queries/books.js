const { default: axios } = require("axios");
const db = require("../db/dbConfig");

const getAllBooks = async () => {
  try {
    const allBooks = await db.any("SELECT * FROM books");
    return allBooks;
  } catch (error) {
    return error;
  }
};

const getOneBook = async (id) => {
  try {
    const book = await db.any(`SELECT * FROM books WHERE id=$1`, [id]);
    return book;
  } catch (error) {
    return error;
  }
};

const createBook = async (isbn) => {
  const API = process.env.API;
  let googleBook = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${API}`
  );
  googleBook = googleBook.data.items[0];

  try {
    const book = await db.one(
      "INSERT INTO books (title, authors, categories, description, isbn, pageCount, images) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        googleBook.volumeInfo.title,
        googleBook.volumeInfo.authors,
        googleBook.volumeInfo.categories,
        googleBook.volumeInfo.description,
        isbn,
        googleBook.volumeInfo.pageCount,
        googleBook.volumeInfo.imageLinks,
      ]
    );
    return book;
  } catch (error) {
    return error;
  }
};

const updateBook = async (bookInput, id) => {
  try {
    const { title, isbn } = bookInput;

    const book = await db.one(
      "UPDATE books SET title=$1, isbn=$2 WHERE id=$3 RETURNING *",
      [title, isbn, id]
    );
    return book;
  } catch (error) {
    return error;
  }
};

const deleteBook = async (id) => {
  try {
    const book = await db.one(`DELETE FROM books WHERE id=$1 RETURNING *`, [
      id,
    ]);
    return book;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
};

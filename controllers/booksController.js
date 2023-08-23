const express = require("express");
const books = express.Router();

const {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../queries/books");

books.get("/", async (req, res) => {
  const allBooks = await getAllBooks();
  if (allBooks) {
    res.status(200).json(allBooks);
  } else {
    res.status(500).json({ error: "Server Error, Can't Find Books" });
  }
});

// SHOW
books.get("/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const book = await getOneBook(isbn);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
books.post("/:isbn", async (req, res) => {
  const { isbn } = req.params;
  try {
    const book = await createBook(isbn);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// DELETE
books.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBook = await deleteBook(id);
  if (deletedBook) {
    res.status(200).json(deletedBook);
  } else {
    res.status(400).json("Book not found");
  }
});

// UPDATE
books.put("/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const updatedBook = await updateBook(isbn, req.body);
  res.status(200).json(updatedBook);
});

module.exports = books;

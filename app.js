const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./db/dbConfig");

//MIDDLEWARE
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Having fun isn't hard, when you have a library card");
});

const usersController = require("./controllers/usersController");
app.use("/users", usersController);

const booksController = require("./controllers/booksController");
app.use("/books", booksController);

const checkoutController = require("./controllers/checkoutContoller");
app.use("/checkout", checkoutController);

module.exports = app;

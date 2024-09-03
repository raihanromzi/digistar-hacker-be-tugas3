const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let books = [];
let currentId = 1; // Memulai id dari 1

// Mendapatkan semua buku
app.get("/books", (req, res) => {
  res.status(200).send(books);
});

// Mendapatkan satu buku berdasarkan id
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);

  if (book) {
    res.status(200).send(book);
  } else {
    res.status(404).send({ message: "Buku Tidak Ditemukan" });
  }
});

// Mencari buku berdasarkan judul
app.get("/search", (req, res) => {
  const title = req.query.title;
  const book = books.find((book) => book.title === title);

  if (book) {
    res.status(200).send(book);
  } else {
    res.status(404).send({ message: "Buku Tidak ada di database" });
  }
});

// Menambahkan buku baru
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).send({
      message: "Tolong masukkan judul dan penulis buku terlebih dahulu",
    });
  }

  const book = {
    id: currentId++,
    title,
    author,
  };

  books.push(book);
  res.status(201).send(book);
});

// Memperbarui informasi buku berdasarkan id
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books[bookIndex].title = title;
    books[bookIndex].author = author;
    res.status(200).send(books[bookIndex]);
  } else {
    res.status(404).send({ message: "Buku Tidak ada di database" });
  }
});

// Menghapus buku berdasarkan id
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(200).send({
      message: "Buku telah berhasil dihapus",
    });
  } else {
    res.status(404).send({ message: "Buku Tidak ada di database" });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});

const express = require('express')
const bodyParser = require('body-parser')
const mysql      = require('mysql');
const server = express()
server.use(bodyParser.json());

const cors = require('cors');
server.use(cors());



// db connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbcrud",


});

db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
  } else {
    console.log("successfully Connected to DB");
  }
});

server.listen(8088,function check(error) {
  if (error) 
  {
  console.log("Error....dddd!!!!");
  }
  else 
  {
      console.log("Started....!!!! 8088");
  }
});

server.post("/api/books/add", (req, res) => {
  let details = {
    bookname: req.body.bookname,
    author: req.body.author,
    price: req.body.price,
  };
  let sql = "INSERT INTO books SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Book created Failed" });
    } else {
      res.send({ status: true, message: "Book created successfully" });
    }
  });
});



server.get("/api/books", (req, res) => {
  var sql = "SELECT * FROM books";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});



server.get("/api/books/:id", (req, res) => {
  var bookid = req.params.id;
  var sql = "SELECT * FROM books WHERE id = ?";
  db.query(sql, [bookid], function (error, result) {
    if (error) {
      console.log("Error fetching data from DB");
      res.send({ status: false, message: "Error fetching data from DB" });
    } else {
      res.send({ status: true, data: result });
    }
  });
});


// update
server.put("/api/books/update/:id", (req, res) => {
  console.log("PUT request received for ID:", req.params.id);
  let sql = "UPDATE books SET bookname = ?, author = ?, price = ? WHERE id = ?";
  let values = [req.body.bookname, req.body.author, req.body.price, req.params.id];

  db.query(sql, values, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Update Failed" });
    } else {
      res.send({ status: true, message: "Updated successfully" });
    }
  });
});

// delete
server.delete("/api/books/delete/:id", (req, res) => {
  let sql = "DELETE FROM books WHERE id = ?";
  let values = [req.params.id];

  db.query(sql, values, (error) => {
    if (error) {
      res.send({ status: false, message: "Deletion Failed" });
    } else {
      res.send({ status: true, message: "Deleted successfully" });
    }
  });
});
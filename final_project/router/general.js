const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  try{
    console.log(req.body);
  const {username,password}=req.body;
  if(isValid(username)){
    return res.status(300).json({message: "username already exists"});
  }
  else{
    users.push({username,password});
    console.log(users);
    return res.status(200).json({message: "user registered successfully"});
  }
  
}catch(err){
  return res.status(500).json({error: "server error"});
}
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  try{
    console.log(books);
  const data=[];
  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      console.log(books[key]);
      data.push(books[key]);
    }
  }
  console.log
  if(data.length>0){
    return res.status(200).json({status:true,data:data});
  }
  else{
    return res.status(300).json({message: "no books available"});
  }
}catch(err){
  return res.status(500).json({error: "server error"});
}
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  try{
    const isbn=req.params.isbn;
  const data=[];
  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      if(books[key].isbn===isbn){
        data.push(books[key]);
      }
     }
    }
  if(data.length>0){
    return res.status(200).json({status:true,data:data});
  }
  else{
    return res.status(300).json({message: "no books available matching the isbn"});
  }
}catch(err){
  return res.status(500).json({error: "server error"});
}
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  try{
    const author=req.params.author;
  const data=[];
  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      if(books[key].author===author){
        data.push(books[key]);
      }
     }
    }
  if(data.length>0){
    return res.status(200).json({status:true,data:data});
  }
  else{
    return res.status(300).json({message: "no books available matching the author"});
  }
}catch(err){
  return res.status(500).json({error: "server error"});
}
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  try{
    const title=req.params.title;
  const data=[];
  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      if(books[key].title===title){
        data.push(books[key]);
      }
     }
    }
  if(data.length>0){
    return res.status(200).json({status:true,data:data});
  }
  else{
    return res.status(300).json({message: "no books available matching the title"});
  }
}catch(err){
  return res.status(500).json({error: "server error"});
}
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  try{
    const isbn=req.params.isbn;
  const data=[];
  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      if(books[key].isbn===isbn){
        data.push(books[key].reviews);
      }
     }
    }
  if(data.length>0){
    return res.status(200).json({status:true,data:data});
  }
  else{
    return res.status(300).json({message: "no reviews  available against book matching the isbn "});
  }
}catch(err){
  return res.status(500).json({error: "server error"});
} 
});

module.exports.general = public_users;

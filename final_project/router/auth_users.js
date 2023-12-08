const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
  let valid = false;
  for (let user in users){
    if (users[user].username==username){
      valid = true;
    }
  }
  return valid;
  //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{
  let valid =false;
  for (let user in users){
    if (users[user].username==username && users[user].password==password){
      valid =true;
    }
  }
  return valid;
   //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;

  // Example: Check if the username and password are valid
  if (authenticatedUser(username,password)) {
    // Generate a token
    const token = jwt.sign({ username }, "fingerprint_customer", { expiresIn: '1h' });

    // Send the token as a response
    req.session.user={username};
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  try{
    const isbn=req.query;
    const {rating,comment}=req.body;
    for(let key in books)
    {
       if(books[key].isbn==isbn){
        books[key].reviews.push({rating,comment});
       console.log(books[key].reviews);
       }
    }
    console.log(books);
    return res.status(200).json({message:"review has been added"});
  }
  catch(err){
    return res.status(300).json({message: "Yet to be implemented"});
  }
});
regd_users.delete("/delete/:isbn", (req, res) => {
  try{
    console.log(req.params);
    const isbn = req.params.isbn;
    console.log(isbn);
    for( let key in books){
      if(books[key].isbn==isbn){
        delete books[key];
      }
    }
    res.status(200).json({message:`The book with ISBN ${isbn} has been deleted!`});
  }catch(err){
    res.status(500).json({error:"server error"});
  }
  
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

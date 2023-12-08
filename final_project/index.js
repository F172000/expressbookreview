const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    try{
        let token =req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify= jwt.verify(token,"fingerprint_customer");
        console.log(verify);
        next();
    }catch(err){
        res.status(401).json({
            message:"invalid token"
        });
    }
//Write the authenication mechanism here
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));

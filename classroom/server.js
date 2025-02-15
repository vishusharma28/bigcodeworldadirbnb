const express = require("express");
const app = express();
const users = require("./routes/user.js");  
const posts = require("./routes/user.js")
const session = require('express-session');
const flash = require('connect-flash');
const path = require("path");
app.use(flash());


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const sessionOption = {
    secret: 'mysuperhidestring',
    resave: false,
    saveUninitialized: true,
  }

app.use(session(sessionOption));

app.get("/register", (req, res)=>{
   let {name = "UnKwon"} = req.query;
   req.session.name = name;
  if(name == "UnKwon"){
     req.flash("error", "User Not Found");
  }else{
    req.flash("success", "User Registered Successfully");
  }
   res.redirect("/hello")
});
app.get("/Hello", (req, res)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.render("page.ejs",{name: req.session.name});
})


// app.get("/reqcount", (req, res)=>{
//     console.log(req.session.views);
//     req.session.views = (req.session.views || 0) + 1;
//     res.send("You have viewed this page " + req.session.views + " times.");

// }); 
// app.get("/test", (req, res)=>{
//     res.send("Hello World");
// })


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})

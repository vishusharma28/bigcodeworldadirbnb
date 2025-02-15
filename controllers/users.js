const User = require("../models/user.js");



module.exports.renderSignUpForm =  (req, res) => {
    res.render("users/signup.ejs");
  }

module.exports.singUp = async (req, res) => {  // Corrected the typo here
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
       return next(err);
      }      
    req.flash("success", "Welcome to Wanderlust");
    res.redirect("/listings");
    });
   
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
}

module.exports.renderSignInForm = (req, res) => {
    res.render("users/login.ejs");
  }

  module.exports.login =  async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl ||"/listings";
    res.redirect(redirectUrl);
  }

  module.exports.logOut =  (req, res, next)=>{
    req.logout((err)=>{
      if(err){
        return next(err);
        }
        req.flash("success","Logged out successfully");
        res.redirect("/listings");
        
    })
  }
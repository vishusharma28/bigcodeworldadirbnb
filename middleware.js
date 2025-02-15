const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create a new listing");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

//Authentication
module.exports.isOwner =  async (req, res, next) =>{
  let { id } = req.params;
  let listing =  await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currentUser._id)){
   req.flash("error", "You are not the owner of this listing");
 return  res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validationListing =  (req, res, next)=>{
  let {error} =   listingSchema.validate(req.body);
  console.log(error);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
}

module.exports.validationReview =  (req, res, next)=>{
  let {error} =   reviewSchema.validate(req.body);
  console.log(error);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
};

module.exports.isReviewAuthor =  async (req, res, next) =>{
  let { id, reviewId } = req.params;
  let review =  await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currentUser._id)){
   req.flash("error", "You are not the Author of this Review, Don't Try again");
 return  res.redirect(`/listings/${id}`);
  }
  next();
}

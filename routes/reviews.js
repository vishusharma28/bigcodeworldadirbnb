const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validationReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controllers/reviews.js")



// review 
router.post("/", validationReview, isLoggedIn, wrapAsync(reviewController.createReviews));
   
     // DELETE REVIEW ROUTE 
     
     router.delete("/:reviewId", isLoggedIn, isReviewAuthor,
       wrapAsync(reviewController.destroyReview)
     );

     module.exports = router;
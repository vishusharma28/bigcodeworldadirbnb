const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReviews = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    
   listing.reviews.push(newReview);
   await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created");

    res.redirect(`/listings/${listing._id}`);
   
     }


module.exports.destroyReview =
async (req, res) => {
    let { id, reviewId } = req.params; // Use req.params instead of req.param
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "New Review Deleted");
    res.redirect(`/listings/${id}`);
  }
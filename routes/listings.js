const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validationListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfic.js");
const upload = multer({ storage })



router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn, validationListing, wrapAsync(listingController.createListing))
// .post(upload.single('listing[image]'), (req, res)=>{
//   res.send(req.file);
// })
 

  //New Route
  router.get("/new", isLoggedIn, listingController.renderNewForm);
  

  router.route("/:id")
  .get( wrapAsync(listingController.showListing))
  .put(isLoggedIn,isOwner, validationListing, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

 
//Edit Route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.editListing));


module.exports = router;
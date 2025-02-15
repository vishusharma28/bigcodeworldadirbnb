const express = require("express");
const app = express()
const router = express.Router();

// show posts -
router.get("/", (req, res)=>{
    res.send("I am posts");
});
// show-
router.get("/:id", (req, res)=>{
    res.send("I am get Post posts");
    });

    router.post("/", (req, res)=>{
        res.send("post for posts");
        });
    

// Delete posts -
router.delete("/:id", (req, res)=>{
    res.send("I am Put posts");
    });
    
    module.exports = router;
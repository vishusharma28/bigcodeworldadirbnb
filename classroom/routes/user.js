const express = require("express");
const app = express()
const router = express.Router();

// FOr USers 
router.get("/", (req, res)=>{
    res.send("I am User");
});

// show Users -
router.get("/:id", (req, res)=>{
    res.send("I new am Post User");
    });

// Post Users -
router.post("/", (req, res)=>{
    res.send("I am Post User");
    });

// Delete Users -
router.delete("/:id", (req, res)=>{
    res.send("I am Put User");
    });

    module.exports = router;
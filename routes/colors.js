const express = require("express");
const router = express.Router();
const Color = require("../models/colors");

// Restful endpoints / Routes

// Getting all
router.get("/", async(req, res)=> {
     try{
        const colors = await Color.find();
        res.json(colors);
     }catch(err){
        res.status(500).json({message: err.message});
     }
});

// Getting one
router.get("/:id", (req, res)=>{
    res.send(req.params.id); 
});

// Creating one
router.post("/", (req, res)=> {

});

// Updating One
router.patch("/:id", (req, res)=> {

});

// Deleting one
router.delete("/:id", (req, res)=> {

});


module.exports = router;
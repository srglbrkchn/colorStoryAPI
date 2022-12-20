const express = require("express");
const router = express.Router();
const Color = require("../models/color");

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
router.get("/:id", getColor, (req, res)=>{
    res.json(res.color); 
});

// Creating one
router.post("/", async(req, res)=> {
       const color = new Color({
        name: req.body.name,
        hex: req.body.hex,
        rgb: req.body.rgb,
        meaning: req.body.meaning
       });
    try{
        const newColor = await color.save();
        res.status(201).json(newColor);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

// Updating One
router.patch("/:id", getColor, async(req, res)=> {
    if(req.body.name != null) {
        res.color.name = req.body.name;
    }

    if(req.body.hex != null) {
        res.color.hex = req.body.hex;
    }

    if(req.body.rgb != null) {
        res.color.rgb = req.body.rgb;
    }

    if(req.body.meaning != null) {
        res.color.meaning = req.body.meaning;
    }

    try{
        const updatedColor = await res.color.save();
        res.json(updatedColor);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

// Deleting one
router.delete("/:id", getColor, async(req, res)=> {
    try{
        await res.color.remove();
        res.json({message: "Color Deleted..."});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});


// getColor middleware
async function getColor(req, res, next){
    let color;
    try{
        color = await Color.findById(req.params.id);

        if(color == null){
            return res.status(404).json({message: "The color does not exist in our database!"});
        }

    }catch(err){
        return res.status(500).json({message: err.message});
    }

    res.color = color;
    next();
}


module.exports = router;
require("dotenv").config();

const { application } = require("express");
const express = require("express");
const app = express(); 
const mongoose = require("mongoose");

// connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error)=>{
    console.error(error);
});
db.once("open", ()=> {
    console.log("Connected to database");
});

// set up server to accept json
app.use(express.json());

// set up routes
const colorsRouter =  require("./routes/colors");

app.use("/colors", colorsRouter);

app.listen(3000, ()=> {
    console.log("The server is up and running...");
}); 
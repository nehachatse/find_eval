const mongoose = require("mongoose");
const express = require("express");

require("dotenv").config()

const app = express()
app.use(express.json());

let port = process.env.PORT || 8000
const bookController = require("./Controller/book.controller")
const authController = require("./Controller/auth.controller")


mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to mongo db"))
.catch(()=> console.log("Not connected to mongo db"))

app.get("/book", bookController);
app.post("/book", bookController);
app.post("/login", authController);
app.post("/signup", authController);


app.listen(port, async() => {
    console.log("listing");
})
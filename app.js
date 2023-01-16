require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn.js");
const bodyparser = require("body-parser")
const cors = require("cors");
const router = require("./routes/router.js");
const cookiParser = require("cookie-parser")
const path = require("path");
const port = 8000;


// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cookiParser());
app.use(router);

app.use("/uploads", express.static("./uploads"))

app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})
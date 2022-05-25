const dotenv = require('dotenv')
dotenv.config();
const express = require("express");
const app = express();
const mongoDb = require("./server/mongoDb");
const cookie = require('cookie-parser');
app.use(cookie());
app.use(express.json());


const user = require("./routes/user"); 
const wallet = require("./routes/wallet");
const transcation = require("./routes/transcation")
const fraud = require("./routes/fraud");


mongoDb();
app.use(user)
app.use(wallet)
app.use(transcation)
app.use(fraud)


const port = process.env.PORT
app.listen(port, () => console.log(`Server Start on port ${port}`));    
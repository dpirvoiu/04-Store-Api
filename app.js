require('dotenv').config();

// async errors
const express = require('express');
const app = express();
const connectDB = require("./db/connect")

//import
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

app.use(express.json())

// routes
app.get('/', (req,res)=>{
  res.send('<h1>Store api</h1> <a href="/api/v1/products">products route</a>')
})

// use middleware

app.use(notFoundMiddleware, errorMiddleware);

const port = process.env.PORT || 3000;

const start = async()=>{
  try{
    // connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, ()=> console.log(`server is listening to ${port}...`))
  }catch (e) {
    console.log(e)
  }
}

start()
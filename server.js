const express= require('express')
const colors=require('colors')
const dotenv=require('dotenv')
const morgan=require('morgan')
const connectDB = require('./config/db')
const authRoutes= require('./routes/authRoute')
const categoryRoutes=require('./routes/categoryRoutes')
const productRoutes= require('./routes/productRoutes')
const cors= require('cors')
const path =require('path')


dotenv.config()

connectDB();

const app=express()

app.use(cors());
app.use(morgan("dev"));
app.use(express.json())
app.use(express.static(path.join(__dirname,'./client/build')))



app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)



app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port=process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is Listening on ${port}`.bgCyan.white)
})
const express = require('express');
const dotenv = require('dotenv'); 
const cors = require('cors');
const morgan = require('morgan'); 

const connectDB = require('./config/db');
const usersRoutes = require('./routes/usersRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')
const surveysRoutes = require('./routes/surveysRoutes')

const app = express();
dotenv.config(); 
connectDB();

const PORT = process.env.PORT;

app.use(morgan('dev'))
app.use(express.json()); 
app.use(express.urlencoded({extended:true})) 
app.use(cors()); 

app.use('/users',usersRoutes)
app.use('/categories',categoriesRoutes)
app.use('/surveys',surveysRoutes)

app.listen(PORT,()=>{console.log(`server listening on port ${PORT}`)})
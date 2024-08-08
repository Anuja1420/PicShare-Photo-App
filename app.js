const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const expressvalidator = require('express-validator');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

mongoose.connect('mongodb+srv://test:test@cluster0.vkjnqsh.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


//To mount middleware functions at the specifies path
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

//Adding Routes
const indexroute = require('./Routes/index.js');
const uploadroute = require('./Routes/upload.js');

app.use('/', indexroute);
app.use('/upload', uploadroute);

const PORT = 6005;

app.listen(PORT,()=>{
    console.log("Server running on port: " + PORT)
});



    

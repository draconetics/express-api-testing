const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 5656;


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/res-api-example', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('db is connected'))
    .catch(err => console.log('error to connect database'));

//midellware
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);
app.get('/sample', (res, req)=>console.log('get sample full'));

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
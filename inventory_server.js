const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/inventory',
    {
        useNewUrlParser: true
    }
)
.then(() => console.log('Connected to mongodb....'))
.catch( err => console.error('Could not connect to MongoDB.....', err))


//Port

const port = process.env.PORT || 3001;


app.listen( port, () => {
    return(
        console.log(`It is listening to port ${port}`)
    )
} )
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const port = process.env.PORT
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

connectToMongo();

app.use('/workshop/journal', require('./journal-app/routes/journalRouter'));


app.use((err, req, res, next) => {
    console.log(err);
    return res.send({ errMsg: err.message });
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
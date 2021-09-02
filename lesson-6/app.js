const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();

const { DB_CONNECT_URL, PORT } = require('./configs/config');

mongoose.connect(DB_CONNECT_URL);

const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));

const { userRouter, bookRouter } = require('./router');

app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Unknown error'
        });
}

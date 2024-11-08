const express = require('express');
const app = express();

const Dotenv = require('dotenv');
const dotenv = Dotenv.config();
const PORT = process.env.PORT;

const router = require('./routes/router.js')

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(router);

app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint not found'
    });
})

app.use((err, req, res, next) => {
    console.error(err.stack)

    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
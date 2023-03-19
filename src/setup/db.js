const mongoose = require('mongoose');
require('dotenv/config');

const connect = () => {
    mongoose
        .connect('mongodb://localhost:27017/distributor')
        .then(() => {
            console.log(`Database connected on port: ${process.env.BD_PORT}`);
        })
        .catch((err) => {
            console.log(`Error on database connect: ${err}`);
        });
};

module.exports = { connect };

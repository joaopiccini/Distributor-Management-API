const mongoose = require('mongoose');
require('dotenv/config');

const connect = () => {
    mongoose
        .connect(process.env.MONGO_DB)
        .then(() => {
            console.log(`Database has been connected`);
        })
        .catch((err) => {
            console.log(`Error on database connect: ${err}`);
        });
};

module.exports = { connect };

const mongoose = require('mongoose');

const port = 27017;

const connect = () => {
    mongoose
        .connect(`mongodb://localhost:${port}/distributor`)
        .then(() => {
            console.log(`Database connected on port: ${port}`);
        })
        .catch((err) => {
            console.log(`Error on database connect: ${err}`);
        });
};

module.exports = {
    connect,
};

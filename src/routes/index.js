/* eslint-disable prettier/prettier */
const bodyParser = require('body-parser');
const usersRoutes = require('./usersRoutes');
const productsRoutes = require('./productsRoutes');
const requestsRoutes = require('./requestsRoutes');
const customersRoutes = require('./customersRoutes');
const apiRoutes = require('./apiRoutes')

module.exports = app => {

    app.get('/', (req, res) => {
        res.render('index');
    });
    
    app.use(
        bodyParser.json(),
        usersRoutes,
        productsRoutes,
        requestsRoutes,
        customersRoutes,
        apiRoutes
        );

}

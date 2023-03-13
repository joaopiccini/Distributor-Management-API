/* eslint-disable prettier/prettier */
const bodyParser = require('body-parser');
const usersRoutes = require('./usersRoutes');
const productsRoutes = require('./productsRoutes');
const requestsRoutes = require('./requestsRoutes');
const CustomersController = require('./customersRoutes');

module.exports = app => {

    app.get('/', (req, res) => {
        if(req.session){
            res.render('index');
        } else {
            res.render('login');
        }
    });
    
    app.use(
        bodyParser.json(),
        usersRoutes,
        productsRoutes,
        requestsRoutes,
        CustomersController
        );

}

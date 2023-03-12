const bodyParser = require('body-parser')
const usersRoutes = require('./usersRoutes')
const productsRoutes = require('./productsRoutes')
const requestsRoutes = require('./requestsRoutes')

module.exports = app => {
    
    app.use(
        bodyParser.json(),
        usersRoutes,
        productsRoutes,
        requestsRoutes
        );

}

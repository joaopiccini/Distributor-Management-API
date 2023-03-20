/* eslint-disable prefer-const */
const jwt = require('jsonwebtoken');
const shortId = require('shortid');
const UsersService = require('../services/UsersService');
const CustomersService = require('../services/CustomersService');
const ProductsService = require('../services/ProductsService');
const RequestsService = require('../services/RequestsService');
const Authentication = require('../auth/Authentication');
const InMemoryDb = require('../setup/InMemoryDb');
require('dotenv/config');

class UsersController {
    static async createToken(req, res) {
        try {
            const userData = req.body;
            const dataLimit = Object.keys(userData).length === 2;
            const userDataIsValid = userData.email && userData.password && dataLimit;
            if (userDataIsValid) {
                const userExists = await UsersService.findUserByEmail(userData.email);
                if (userExists && userExists.status === 'A') {
                    const userAutenticate = await Authentication.autenticateUser(userData, userExists);
                    if (userAutenticate) {
                        const expiresIn = '365d';
                        const regex = 'new ObjectId("")';
                        const userId = JSON.stringify(userExists._id).replace(regex, '');
                        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
                        return res.status(200).json({
                            message: `Token created with expiration time of: ${expiresIn}`,
                            token
                        });
                    }
                    return res.status(400).json('User data is incorrect or not valid.');
                }
                return res.status(400).json('User data is incorrect or not valid.');
            }
            return res.status(400).json('User data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async startSystem(req, res) {
        try {
            const inMemoryDb = new InMemoryDb();
            const users = inMemoryDb.getUsers();
            const customers = inMemoryDb.getCustomers();
            const products = inMemoryDb.getProducts();
            // eslint-disable-next-line prefer-const
            let requests = inMemoryDb.getRequests();
            const usersQuantity = users.length;
            const customersQuantity = customers.length;
            const productsQuantity = products.length;
            const requestsQuantity = requests.length;
            const regex = /"/g;
            for (let i = 0; i < usersQuantity; i++) {
                await UsersService.createUser(users[i]);
            }
            for (let i = 0; i < customersQuantity; i++) {
                await CustomersService.createCustomer(customers[i]);
            }
            for (let i = 0; i < productsQuantity; i++) {
                await ProductsService.registerProduct(products[i]);
            }
            for (let i = 0; i < requestsQuantity; i++) {
                const productsInDB = await ProductsService.findAllProducts();
                const randomQuantityOfProducts = Math.floor(Math.random() * 5 + 1);
                for (let x = 0; x < randomQuantityOfProducts; x++) {
                    const randomProduct = Math.floor(Math.random() * 9);
                    const randomQuantity = Math.floor(Math.random() * 50);
                    const productId = JSON.stringify(productsInDB[randomProduct]._id).replace(regex, '');
                    requests[i].products.push(productId);
                    requests[i].quantity.push(randomQuantity);
                }
                let totalValueOfProducts = 0;
                for (let y = 0; y < randomQuantityOfProducts; y++) {
                    totalValueOfProducts += productsInDB[y].price * requests[i].quantity[y];
                }
                const customersInDB = await CustomersService.findAllCustomers();
                const randomCustomer = Math.floor(Math.random() * 9);
                const customerId = JSON.stringify(customersInDB[randomCustomer]._id).replace(regex, '');
                requests[i].price = totalValueOfProducts;
                requests[i].customer = customerId;
                requests[i].author = req.user.replace(regex, '');
                requests[i].status = 'released';
                requests[i].cod = shortId.generate();
                await RequestsService.doRequest(requests[i]);
            }
            return res.status(200).json({ message: 'System started' });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async testCreateToken(userData) {
        try {
            const inMemoryDb = new InMemoryDb();
            const users = inMemoryDb.getUsers();
            const dataLimit = Object.keys(userData).length === 2;
            const userDataIsValid = userData.email && userData.password && dataLimit;
            if (userDataIsValid) {
                const userExists = users.filter((user) => user.email === userData.email);
                if (userExists) {
                    const userAutenticate = await Authentication.testAutenticateUser(userData, userExists);
                    if (userAutenticate) {
                        const expiresIn = '365d';
                        const userId = userData.name;
                        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
                        return token;
                    }
                    return 'User data is incorrect or not valid.';
                }
                return 'User data is incorrect or not valid.';
            }
            return 'User data is incorrect or not valid.';
        } catch (err) {
            console.log(err);
            return 'Internal Server Error.';
        }
    }

    static async testStartSystem() {
        try {
            const inMemoryDb = new InMemoryDb();
            const users = inMemoryDb.getUsers();
            let newUsers = [];
            const customers = inMemoryDb.getCustomers();
            let newCustomers = [];
            const products = inMemoryDb.getProducts();
            let newProducts = [];
            let requests = inMemoryDb.getRequests();
            let newRequests = [];
            const usersQuantity = users.length;
            const customersQuantity = customers.length;
            const productsQuantity = products.length;
            const requestsQuantity = requests.length;
            for (let i = 0; i < usersQuantity; i++) {
                newUsers.push(users[i]);
            }
            for (let i = 0; i < customersQuantity; i++) {
                newCustomers.push(customers[i]);
            }
            for (let i = 0; i < productsQuantity; i++) {
                newProducts.push(products[i]);
            }
            for (let i = 0; i < requestsQuantity; i++) {
                const randomQuantityOfProducts = Math.floor(Math.random() * 5 + 1);
                for (let x = 0; x < randomQuantityOfProducts; x++) {
                    const randomProduct = Math.floor(Math.random() * 9);
                    const randomQuantity = Math.floor(Math.random() * 50);
                    const productId = newProducts[randomProduct];
                    requests[i].products.push(productId);
                    requests[i].quantity.push(randomQuantity);
                }
                let totalValueOfProducts = 0;
                for (let y = 0; y < randomQuantityOfProducts; y++) {
                    totalValueOfProducts += newProducts[y].price * requests[i].quantity[y];
                }
                const randomCustomer = Math.floor(Math.random() * 9);
                const customerId = newCustomers[randomCustomer];
                requests[i].price = totalValueOfProducts;
                requests[i].customer = customerId;
                requests[i].author = 'Test';
                requests[i].status = 'released';
                requests[i].cod = shortId.generate();
                newRequests.push(requests[i]);
            }
            let response = {
                message: 'System started',
                newRequests
            };
            return response;
        } catch (err) {
            console.log(err);
            return 'Internal Server Error.';
        }
    }
}

module.exports = UsersController;

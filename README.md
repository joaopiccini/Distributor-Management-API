# Distributor Management

An API for managing products and customers of a distributor. You can see all API routes on:

-   [API Documentation](https://documenter.getpostman.com/view/26438823/2s93JzMgDt)

## First steps

To host this API on your machine, you need the following components installed:

-   NodeJS v16.19.1
-   MongoDB v3.6.8

After installing the above components use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install
```

## Config

After installing the dependencies it will be necessary to change some settings, change the name of the .env_example file to .env, the file contains the following settings:

```javascript
HTTP_PORT = '8080';
JWT_SECRET = 'secret';
MONGO_DB = 'mongodb://localhost:27017/distributor';
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

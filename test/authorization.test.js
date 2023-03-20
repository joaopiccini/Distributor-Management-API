const jwt = require('jsonwebtoken');
const Authentication = require('../src/auth/Authentication');
const InMemoryDb = require('../src/setup/InMemoryDb');
require('dotenv/config');

describe('Authentication', () => {
    const inMemoryDb = new InMemoryDb();
    const dbUsers = inMemoryDb.getUsers();
    const databaseUser = dbUsers[0];
    it('should be able to validate the JSON Web Token', async () => {
        const validToken = jwt.sign({ userId: 'validUserId' }, process.env.JWT_SECRET);
        const tokenWithBearer = `Bearer ${validToken}`;
        const authentication = await Authentication.testValidateJWT(tokenWithBearer);
        expect(authentication).toEqual('validUserId');
    });
    it('should be able to reject a invalid JSON Web Token', async () => {
        const invalidToken = jwt.sign({ userId: 'validUserId' }, 'invalidSecret');
        const tokenWithBearer = `Bearer ${invalidToken}`;
        const authentication = await Authentication.testValidateJWT(tokenWithBearer);
        expect(authentication).toEqual('Token informed in the requst is not valid.');
    });
    it('should be able to validate a user email and password', async () => {
        const requestUser = {
            email: 'joao@distributor.com',
            password: 'validPassword'
        };
        const authentication = await Authentication.testAutenticateUser(requestUser, databaseUser);
        expect(authentication).toEqual(true);
    });
    it('should be able to reject a invalid user email', async () => {
        const requestUser = {
            email: 'invalid@distributor.com',
            password: 'validPassword'
        };
        const authentication = await Authentication.testAutenticateUser(requestUser, databaseUser);
        expect(authentication).toBeFalsy();
    });
    it('should be able to reject a invalid user password', async () => {
        const requestUser = {
            email: 'joao@distributor.com',
            password: 'invalid'
        };
        const authentication = await Authentication.testAutenticateUser(requestUser, databaseUser);
        expect(authentication).toBeFalsy();
    });
    it('should be able to reject a invalid user data', async () => {
        const invalidRequestUser = {
            email: 'joao@distributor.com'
        };
        const authentication = await Authentication.testAutenticateUser(invalidRequestUser, databaseUser);
        expect(authentication).toEqual('User data is incorrect or not valid.');
    });
});

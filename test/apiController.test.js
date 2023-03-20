const ApiController = require('../src/controllers/ApiController');
const InMemoryDb = require('../src/setup/InMemoryDb');

describe('API', () => {
    const inMemoryDb = new InMemoryDb();
    const dbUsers = inMemoryDb.getUsers();
    const databaseUser = dbUsers[0];
    it('should be able to generate a JSON Web Token if user data is valid', async () => {
        const requestUser = {
            email: 'joao@distributor.com',
            password: 'validPassword'
        };
        const token = await ApiController.testCreateToken(requestUser);
        expect(token).toContain('eyJ');
    });
    it('should be able to not generate a JSON Web Token if user data is not valid', async () => {
        const requestUser = {
            email: 'joao@distributor.com'
        };
        const token = await ApiController.testCreateToken(requestUser);
        expect(token).toEqual('User data is incorrect or not valid.');
    });
    it('should be able to populate all collections in database', async () => {
        const startSystem = await ApiController.testStartSystem();
        expect(startSystem.message).toContain('System started');
        expect(startSystem.newRequests.length).toBeGreaterThan(1);
    });
});

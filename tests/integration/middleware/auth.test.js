const request = require('supertest')
const { User } = require('../../../models/user')
const { Genre } = require('../../../models/genre')

describe('auth middleware', () => {

    let server;
    let token;

    beforeEach(() => {
        server = require('../../../index')
        token = new User().generateAuthToken();
    })

    afterEach(async() => {
        await Genre.deleteMany({});
        server.close();
    })

    const exec = async () => {
        return await request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'Genre1' })
    }

    it('should return 401 if no token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);

    })

    it('should return 400 if token is invalid', async () => {
        token = 'dummy';
        const res = await exec();
        expect(res.status).toBe(400);
    })

    //This test case will have responsibilty to cleanup created Genre : See afterEach() method.
    it('should return 200 if token is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    })
})
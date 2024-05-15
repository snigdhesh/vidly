const request = require('supertest')
const { Rental } = require('../../models/rental')
const mongoose = require('mongoose')
const { User } = require('../../models/user')
let server;

//test suite
describe('/api/returns', () => {
    let rental;
    let customerId = new mongoose.Types.ObjectId()
    let movieId = new mongoose.Types.ObjectId()

    beforeEach(async () => {
        server = require('../../index')

        //Create and save a sample rental object to database
        rental = new Rental({
            customer: { _id: customerId, name: "12345", isGold: true, phone: "13245" },
            movie: { _id: movieId, title: "12345", dailyRentalRate: 3 }
        })
        await rental.save();
    })
    afterEach(async () => {
        //Delete all records in Rental collection after test-case is executed.
        await Rental.deleteMany({})
        server.close()
    })

    it('should return 401 if client is not logged in', async () => {
        const res = await request(server)
            .post('/api/returns')
            .send({ customerId: customerId, movieId: movieId });
        expect(res.status).toBe(401)
    })

    it('should return 400 if customerId is not provided', async () => {
        const token = new User().generateAuthToken();
        const res = await request(server)
            .post('/api/returns')
            .set("x-auth-token", token)
            .send({ movieId: movieId })

        expect(res.status).toBe(400)
    })

    it('should return 400 if movieId is not provided', async () => {
        const token = new User().generateAuthToken();
        const res = await request(server)
            .post('/api/returns')
            .set("x-auth-token", token)
            .send({ customerId: customerId })

        expect(res.status).toBe(400)
    })

})
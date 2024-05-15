const request = require('supertest')
const { Rental } = require('../../models/rental')
const mongoose = require('mongoose')
const { User } = require('../../models/user')
let server;

//test suite
describe('/api/returns', () => {
    let rental;
    let customerId;
    let movieId;
    let token;

    const exec = () => {
        return request(server)
            .post('/api/returns')
            .set("x-auth-token", token)
            .send({ customerId: customerId, movieId: movieId })
    }

    beforeEach(async () => {
        server = require('../../index')
        customerId = new mongoose.Types.ObjectId()
        movieId = new mongoose.Types.ObjectId()
        token = new User().generateAuthToken();

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
        token=''
        const res = await exec();
        expect(res.status).toBe(401)
    })

    
    it('should return 400 if movieId is not provided', async () => {
        movieId=null;
        const res = await exec();
        expect(res.status).toBe(400)
    })


    it('should return 400 if customerId is not provided', async () => {
        customerId=null; //or you can add it object and delete a property in object like "delete payload.customerId"
        const res = await exec();
        expect(res.status).toBe(400)
    })

    
    it('should return 404 if rental not found for customerId and movieId', async () => {
        await Rental.deleteMany({})
        const res = await exec();
        expect(res.status).toBe(404)
    })

    it('should return 400 if rental is already processed', async () => {
        rental.dateReturned = new Date();
        await rental.save();

        const res = await exec();
        expect(res.status).toBe(400)
    })
})
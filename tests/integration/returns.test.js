const request = require('supertest')
const { Rental } = require('../../models/rental')
const mongoose = require('mongoose')
const { User } = require('../../models/user')
const moment = require('moment')
const { Movie } = require('../../models/movie')
let server;

//test suite
describe('/api/returns', () => {
    let rental;
    let customerId;
    let movieId;
    let token;
    let movie;

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

        movie = new Movie({
            _id: movieId,
            title: '12345',
            dailyRentalRate: 2,
            genre: { name: '13245'},
            numberInStock: 10
        })

        await movie.save();

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
        await Movie.deleteMany({})
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

    it('should return 200 if valid request', async () => {
        const res = await exec();
        expect(res.status).toBe(200)
    })

    it('should set return date if valid request', async () => {
        const res = await exec();
        const rentalInDB = await Rental.findById(rental._id);
        console.log("Rental ID",rental._id)
        let date = new Date()
        const diff =  date - rentalInDB.dateReturned;
        expect(diff).toBeLessThan(1000) //1000 milliseconds
    })

    it('should return rentalFee if input is valid',async ()=>{
        //moment() will give current date time
        //dateOut is standard javascript Date format.
        //toDate() converts Date to plain javascript object to save to db.
        rental.dateOut = moment().add(-7, 'days').toDate(); //7 days ago
        rental.movie.dailyRentalRate = 2;
        await rental.save();

        //Make a post call - This will set rentalFee to DB.
        const res = await exec();
        const rentalInDB = await Rental.findById(rental._id);
        expect(rentalInDB.rentalFee).toBe(14);
    })

    
    it('should increase the movie stock',async ()=>{

        //Make a post call - This will set rentalFee to DB.
        const res = await exec();
        const movieInDB = await Movie.findById(movieId);
        expect(movieInDB.numberInStock).toBe(movie.numberInStock + 1); //10, 11
    })

    it('should return the rental on valid request',async()=>{
        const res = await exec();
        const rentalInDB = await Rental.findById(rental._id)
        //expect(res.body).toMatchObject(rentalInDB) //This causes problems with date format. So this is too specific testing - we don't need that.
        
        //So we try to check if res.body has these elements : ['dateOut','dateReturned','rentalFee','customer','movie']
        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['dateOut','dateReturned','rentalFee','customer','movie'])
        )

      
    })
})
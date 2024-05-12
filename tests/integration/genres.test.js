const request = require('supertest') //This module returns a function
const { Genre, validate } = require('../../models/genre');
const winston = require('winston')
//load server from index.js
let server;

//Test suite
describe('/api/genres', () => {

    //Note: Load server before test executions and close it after test executions
    beforeEach(() => {
        server = require('../../index')
    })
    afterEach(async () => {
        server.close();
        winston.info('Server closed')
        await Genre.deleteMany({});
    })

    //sub test suite
    describe('/GET', () => {

        //Test case 1
        it('should return all genres', async () => {

            //With this command, we can add multiple documents to mongoDB at once.
            //But this will keep adding these documents, whenever test case runs, that happens every time we make a change, due to 'jest --watchAll'
            //So cleanup this collection in afterEach() method
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);

            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(genre => genre.name == 'genre1')).toBeTruthy(); //Every array has 'some()' method
            expect(res.body.some(genre => genre.name == 'genre2')).toBeTruthy(); //Every array has 'some()' method
        })
    })

    //sub test suite
    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            const genre = new Genre({ name: 'Genre1' })
            await genre.save();

            const res = await request(server).get(`/api/genres/${genre._id}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name',genre.name); //We are expecting a property 'name' with value 'Genre1'

        })
    })


})

//Note: Load server before test executions and close it after test executions
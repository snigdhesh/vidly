const request = require('supertest') //This module returns a function
//load server from index.js
let server;

//Test suite
describe('/api/genres',()=> {
    
    //Note: Load server before test executions and close it after test executions
    beforeEach(()=>{ server = require('../../index') })
    beforeEach(()=>{ server.close() })

    //sub test suite
    describe('/GET',()=>{

        //Test case 1
        it('should return all genres', async () => {
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
        })
    })



})

//Note: Load server before test executions and close it after test executions
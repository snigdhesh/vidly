const {User} = require('../../../models/user')
const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')

//Test suite
//describe() function is used to define a test suite. A test suite is a collection of test cases that are related to each other.
describe('user.generateAuthToken',()=> {
    //it () function is used to define a test case. This is very similar to the test() function in Jest.
    //You can use either it() or test() to define a test case.
    it('should return a token',()=> {
        const payload = {_id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true};
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('privateKey'));
        expect(decoded).toMatchObject(payload);
    })
})
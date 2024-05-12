const { User } = require('../../../models/user')
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose')

describe('auth middleware', () => {
    it('should populate req.user with payload coming from JWT token', () => {
        const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };

        const token = new User(user).generateAuthToken();
        const req = {
            //jest.fn() will return a mock function. You can set any return value from here.
            header: jest.fn().mockReturnValue(token)
        };
        const res = {}; //Need a res object to pass to auth function
        const next = jest.fn(); //This returns a mock function

        auth(req, res, next);
        expect(req.user).toMatchObject(user);

    })
})
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// with this we can actually make request to our express applcation
// from our test cases
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Gegool',
    email: 'gegool@magool.com',
    password: 'thisismypass123!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
};

// this function run before each test case in this suite
beforeEach(async () => {
    await User.deleteMany();

    await new User(userOne).save();
    // another way:
    // const user = new User(userOne);
    // await user.save()
});

// afterEach(() => {
//
// });

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Andrew',
        email: 'andrew@andrew.com',
        password: 'ThisIsaStrong123!'
    }).expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body.user.name).toBe('Andrew');

    expect(response.body).toMatchObject({
        user: {
            name: 'Andrew',
            email: 'andrew@andrew.com'
        },
        token: user.tokens[0].token
    });

    // shouldn't be plain text:
    expect(user.password).not.toBe('ThisIsaStrong123!')
});

test('should log in existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});

test('should not log in', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'somewrongpassword'
    }).expect(400)
});

test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) // to set headers
        .send()
        .expect(200);
});

test('should not get the profile', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
});

test('should delete a profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test('should not delete a profile', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
});
const supertest = require("supertest");
const router = require('../api/server.js')

describe('Register', () => {
    describe('Error Message', () => {
        it('Should return an error when username/password are absent', () => {
            return supertest(router)
                .post("/api/auth/register")
                    .then(res => {
                    expect(res.status).toBe(400);
                });
        }) 
    })
})

describe('Register', () => {
    describe('Success Message', () => {
        it('Should return a status 201 when username and password are passed', () => {
            return supertest(router)
                .post("/api/auth/register")
                .send({ username: "Testing2", password: "Register" })
                    .then(res => {
                    expect(res.status).toBe(201);
                });
        }) 
    })
})

describe('Login', () => {
    describe('Error Message', () => {
        it('Should return an error when username/password are absent', () => {
            return supertest(router)
                .post("/api/auth/login")
                    .then(res => {
                    expect(res.status).toBe(400);
                });
        }) 
    })
})

describe('Login', () => {
    describe('Success Message', () => {
        it('Should return a status 201 when username and password are passed', () => {
            return supertest(router)
                .post("/api/auth/login")
                .send({ username: "Testing", password: "Register" })
                    .then(res => {
                    expect(res.status).toBe(200);
                });
        }) 
    })
})

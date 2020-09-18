const { expectCt } = require("helmet");
const supertest = require("supertest");
const router = require('../api/server.js')

describe('Get /', () => {
    it('Should return a 401 without authentication', () => {
        return supertest(router)
            .get('/api/jokes/')
            .then(res => {
                expect(res.status).toBe(401)
            })
    })
})

describe('Get /', () => {
    it('Should return a 200 with authentication', () => {
        return supertest(router)
            .get('/api/jokes/')
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhc3N5RmF0Q2F0IiwiaWQiOjEsImlhdCI6MTYwMDQ0MzE2OCwiZXhwIjoxNjAwNDcxOTY4fQ.0AvWLzOzyJUmfDWwKDmpaBMq40Yn3gGmiXT2byR9Bqo')
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
})
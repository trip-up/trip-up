const { server } = require('../src/app')
const supertest = require('supertest')
const mockRequest = supertest(server)

describe('Error handling', () => {
  it(' responds with 404 on an invalid route', () => {
    return mockRequest
      .get('/fail')
      .then(results => {
        expect(results.status).toBe(404)
      })
  })
})
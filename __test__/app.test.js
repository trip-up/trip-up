require('dotenv').config();

const { server } = require('../src/app')
const supertest = require('supertest')

const { sequelize } = require('../src/orm')

describe('app', () => {
  let SequelizeMock;
  let mockRequest;
  let DBConnectionMock;

  beforeAll(async () => {
    await sequelize.authenticate()
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  })

  beforeEach(() => {
    mockRequest = supertest(server);
    SequelizeMock = require('sequelize-mock');
    DBConnectionMock = new SequelizeMock();
  })

  it(' responds with 404 on an invalid route', async () => {
    const results = await mockRequest
      .get('/fail');

    expect(results.status).toBe(404)
  })



  describe('routes', () => {

    describe('/signup', () => {

      xit('successfully signs up a new user', async () => {
        const newUser = {
          email: 'test@example.com',
          name: 'Susanna',
          password: '123',
          city: 'Seattle',
          phone: '222-222-2222',
          picture: 'http://mypicture.example.com'
        }

        const result = await mockRequest
          .post('/signup')
          .send(newUser);

        expect(result.status).toBe(201);
      })
    })

    describe('/trips', () => {
      it('creates a new trip with a POST request', async () => {
        const newTrip = {
          name: 'Trip to Paradise',
          destination: 'Hawaii',
          start_day: '11/2/20',
          end_day: '11/10/20',
          cost: 1000,
        }

        const result = await mockRequest
          .post('/trips')
          .send(newTrip);

        expect(result.status).toBe(201);

        // return mockRequest
        //   .post('/trips')
        //   .send(newTrip)
        //   .then(result => {
        //     expect(result.status).toBe(201);
        //   })
      })
    })
  })
})


// email: { type: Sequelize.STRING, unique: true },
//     name: { type: Sequelize.STRING, unique: true },
//     password: { type: Sequelize.STRING },
//     city: { type: Sequelize.STRING },
//     phone: { type: Sequelize.STRING },
//     // change to picture_url
//     picture: { type: Sequelize.STRING },







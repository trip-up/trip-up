require('dotenv').config();

const { server } = require('../src/app')
const supertest = require('supertest')

const { sequelize } = require('../src/orm')

describe('app', () => {
  let SequelizeMock;
  let mockRequest;
  let DBConnectionMock;

  beforeAll(async () => {
    // open the connection before all tests execute
    await sequelize.authenticate()
    await sequelize.sync();
  });

  afterAll(async () => {
    // close the connection after all tests have executed
    await sequelize.close();
  })

  beforeEach(() => {
    // resets the mocks before each test
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

      it('successfully signs up a new user', async () => {
        const newUser = {
          email: 'test@example.com',
          name: 'Susanna',
          password: '123',
          city: 'Seattle',
          phone: '222-222-2222',
          // picture: 'http://mypicture.example.com'
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

      it('lists all trips with a GET request', async () => {
        const result = await mockRequest
          .get('/trips')

        expect(result.status).toBe(200);
      })

      it('lists one trip when given a trip id at GET request', async () => {
        const result = await mockRequest
          .get('/trips/trip_id')

        expect(result.status).toBe(200);
      })

      it('allows the trip organizer to delete their trips', () => {
        //  
      })
    })

    describe('/events', () => {
      it('creates a new event with a post request', async () => {

        const newEvent = {
          name: 'Hawaii Luau',
          start_day: '11/22/20',
          end_day: '11/22/20'
        }
        const result = await mockRequest
          .post('/events')
          .send(newEvent);

        expect(result.status).toBe(201);

      })

      it('gets events based on a trip_id', () => {

      })

      it('gets a single event based on its id', () => {

      })

      it('allows the trip organizer to delete an event', () => {

      })

    })

    describe('/trip_signups', () => {
      it('allows a user to signup for a specific trip', async () => {

      })

      it('allows the organizer of the trip to authorize a user to join their trip', () => {

      })
    })
  })
})








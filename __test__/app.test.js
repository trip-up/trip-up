require('dotenv').config();

const { server } = require('../src/app')
const supertest = require('supertest')

const { sequelize } = require('../src/orm')

describe('app', () => {
  let SequelizeMock;
  let mockRequest;
  let DBConnectionMock;
  let userToken;

  beforeAll(async () => {
    // open the connection before all tests execute
    await sequelize.authenticate()
    await sequelize.sync();
    let token;
    let tripId;
  });

  afterAll(async () => {
    const seed = require('../src/orm/seed')
    await seed();

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
        token = result.body.token;
        // console.log('token', token);

        expect(result.status).toBe(201);
      })
    })

    describe('/trips', () => {
      it('creates a new trip with a POST request', async () => {
        const newTrip = {
          name: 'Trip to Paradise',
          destination: 'Hawaii',
          start_day: '2020-11-20',
          end_day: '2020-11-22',
          cost: 1000,
        }

        const result = await mockRequest
          .post('/trips')
          .set('Authorization', `Bearer ${token}`)
          .send(newTrip);
          tripId = result.body.trip_created.id
          // console.log('result.body during post',result.body)
          // console.log('tripId',tripId)
          
        expect(result.status).toBe(201);
      })


      it('lists all trips with a GET request', async () => {
        const result = await mockRequest
          .get('/trips')
          .set('Authorization', `Bearer ${token}`)

        expect(result.status).toBe(200);
      })

      it('lists one trip when given a trip id at GET request', async () => {

        const result = await mockRequest
          .get('/trips/1')
          .set('Authorization', `Bearer ${token}`)

        expect(result.status).toBe(200);
      })

      it('allows the trip organizer to delete their trips', async () => {
        const result = await mockRequest
          .delete(`/trips/${tripId}`)
          .set('Authorization', `Bearer ${token}`)
        // console.log('result.body',result.body)
        expect(result.status).toBe(204);
      })
    })

    describe('/events', () => {
      let eventId;
      const tripId = 3;
      it('creates a new event with a post request', async () => {
        const newEvent = {
          name: 'Hawaii Luau',
          start_day: '2020-11-20',
          end_day: '2020-11-20',
          organizer_user_id: 8
        }
        const result = await mockRequest
          .post(`/events/3`)
          .send(newEvent)
          // .set('Authorization', `Bearer ${token}`)
          eventId = result.body.id

        expect(result.status).toBe(201);

      })

      it('gets events based on a trip_id', async () => {

        const newEvent = {
          id: 1,
          name: 'Hawaii Luau',
          start_day: '11-22-20',
          end_day: '11-22-20'
        }

        await mockRequest
          .post('/events')
          .send(newEvent);
        const result = await mockRequest
          .get('/events/1');

        expect(result.status).toBe(200);

      })

      it('gets a single event based on the event id', async () => {
        const newEvent = {
          id: 1,
          name: 'Hawaii Luau',
          start_day: '2020-11-20',
          end_day: '2020-11-20'
        }

        await mockRequest
          .post('/events')
          .send(newEvent);
        const result = await mockRequest
          .get('/events/1');

        expect(result.status).toBe(200);

      })

      it('allows the trip organizer to delete an event', async () => {

        const result = await mockRequest
          .delete(`/events/1`)
          .send({ organizer_user_id: 8, trip_id: tripId })
        expect(result.status).toBe(204);
      })

    })

    describe('/trip_signups', () => {
      it('allows a user to signup for a specific trip', async () => {
        const newTrip = {
          trip_id: '1',
          name: 'Trip to Paradise',
          destination: 'Hawaii',
          start_day: '2020-11-20',
          end_day: '2020-11-22',
          cost: 1000,
        }

        const trip_id = '1';
        await mockRequest
          .post('/trips')
          .send(newTrip);

        const result = await mockRequest
          .post('/trip-signups/1')
          .set('Authorization', `Bearer ${token}`)
          .send(trip_id)

        expect(result.status).toBe(201);

      })

      it('allows the organizer of the trip to authorize a user to join their trip', async () => {
        const userToApprove = {
          user_id: '1',
          trip_id: '2',
          organizer_user_id: 2,
          approval: true
        }
        const result = await mockRequest
          .put('/trip-signups/2')
          .set('Authorization', `Bearer ${token}`)
          .send(userToApprove)
        expect(result.status).toBe(201);

      })
    })
  })
})








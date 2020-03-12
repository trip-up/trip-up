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
          role_id: 1,
          city: 'Seattle',
          phone: '222-222-2222',
          // picture: 'http://mypicture.example.com'
        }

        const result = await mockRequest
          .post('/signup')
          .send(newUser);
        token = result.body.token;
        console.log('token', token);

        expect(result.status).toBe(201);
      })
    })

    describe('/users', () => {
        describe('/users', () => {
            it('successfully denies request to get all all users in the database if not an admin', async () => {
                const result = await mockRequest
                .get('/users')
                .set('Authorization', `Bearer ${token}`)
              expect(result.status).toBe(403);
            })
            it('successfully gets all users from database if the requested is an admin', async () => {
              const result = await mockRequest
              .get('/users')
              .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiY2FpdEBjYWl0LmNvbSIsIm5hbWUiOiJjYWl0Iiwicm9sZV9pZCI6MSwiaWF0IjoxNTg0MDQ1NjAyfQ.KxUDv217TyAcKBwVoVSKTF3-mPi-vFdbVX5qz2YRtw8')
              expect(result.status).toBe(200)
            })
            it('Denies request to get one user unless requestor is admin', async() => {
              const result = await mockRequest
              .get('/users/3')
              .set('Authorization', `Bearer ${token}`)
            expect(result.status).toBe(403);

            })
            it('Successfuly returns one users if requestor is admin', async () => {
              const result = await mockRequest
              .get('/users/3')
              .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiY2FpdEBjYWl0LmNvbSIsIm5hbWUiOiJjYWl0Iiwicm9sZV9pZCI6MSwiaWF0IjoxNTg0MDQ1NjAyfQ.KxUDv217TyAcKBwVoVSKTF3-mPi-vFdbVX5qz2YRtw8')
              expect(result.status).toBe(200)
            })
          })
        describe('update /users/:id', () => {
          it('Denies update if requestor is not an admin or user whos record is being updated', async () => {
            const result = await mockRequest
            .put('/users/1 city=portland')
            .set('Authorization', `Bearer ${token}`)
              expect(result.status).toBe(403);
          })
        })
          it('Successful updates if requestor is admin', async () => {
            const result = await mockRequest
            .put('/users/1 city=chicago')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiY2FpdEBjYWl0LmNvbSIsIm5hbWUiOiJjYWl0Iiwicm9sZV9pZCI6MSwiaWF0IjoxNTg0MDQ1NjAyfQ.KxUDv217TyAcKBwVoVSKTF3-mPi-vFdbVX5qz2YRtw8')
            expect(result.status).toBe(200);
          })
          it('Successful updates if requestor is user whos record is being updated', async () => {
            const result = await mockRequest
            .put('/users/13 city=portland')
            .set('Authorization', `Bearer ${token}`)
              expect(result.status).toBe(200);
          })
        describe('delete /users/:id', () => {
          it('Denies delete if requestor is not admin or users who\'s record is being deleted', async () => {
            const result = await mockRequest
            .delete('/users/1')
            .set('Authorization', `Bearer ${token}`)
              expect(result.status).toBe(403);
          })
          it('Successfully deletes user record if requestor is an admin', async () => {
            const result = await mockRequest
            .put('/users/1 city=chicago')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiY2FpdEBjYWl0LmNvbSIsIm5hbWUiOiJjYWl0Iiwicm9sZV9pZCI6MSwiaWF0IjoxNTg0MDQ1NjAyfQ.KxUDv217TyAcKBwVoVSKTF3-mPi-vFdbVX5qz2YRtw8')
            expect(result.status).toBe(200);
          })
          it('Successfully deletes user record if requestor is the user whos record is being delete', async() => {
            const result = await mockRequest
            .put('/users/13 city=chicago')
            .set('Authorization', `Bearer ${token}`)
            expect(result.status).toBe(200);
          })
        })
    })
  })
})

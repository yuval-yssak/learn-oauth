import chai from 'chai'
import chaiHttp from 'chai-http'
import faker from 'faker'

const { expect } = chai

import server from '../../../app.js'
import { init, destroy } from '../../../dao/users.js'
import { connect, disconnect } from '../../../mongoClient.js'

chai.use(chaiHttp)

let token

describe('Users route', function () {
  let DBclient
  const signup = '/auth/signup'
  const signin = '/auth/signin'
  const secret = '/auth/secret'
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  const preSave = {
    email: 'mr.sometest@gmail.com',
    password: faker.internet.password()
  }

  before(async function () {
    try {
      DBclient = await connect()
      await init(DBclient)
      const res = await chai.request(server).post(signup).send(preSave)
      expect(res.status).to.equal(200)
      token = res.body.token
    } catch (e) {
      console.error(e)
      throw e
    }
  })

  // after all test have run we drop our test database
  after('droping test db', async function () {
    console.log('about to destroy')
    await destroy()
    await disconnect(DBclient)
  })

  describe('signup', () => {
    it('should crete new user if email not found', async function () {
      const res = await chai.request(server).post(signup).send(user)

      expect(res.status).to.equal(200)
      expect(res.body).not.to.be.empty
      expect(res.body).to.have.property('token')
    })

    it('should return 403 if email was found', done => {
      chai
        .request(server)
        .post(signup)
        .send(preSave)
        .end((err, res) => {
          expect(res.status).to.equal(403)
          expect(res.body).to.be.deep.equal({
            error: 'Email is already in use'
          })
          done()
        })
    })
  })

  describe('secret', () => {
    it('should return status 401', done => {
      chai
        .request(server)
        .get(secret)
        .end((err, res) => {
          expect(res.status).to.equal(401)
          expect(res.body).to.be.empty
          done()
        })
    })
    it('should return status 200', done => {
      console.log('sending token', token)
      chai
        .request(server)
        .get(secret)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({ secret: 'resource' })
          done()
        })
    })
  })

  describe('signin', () => {
    it('should return error 400 if user email and password empty', done => {
      let user = {}
      chai
        .request(server)
        .post(signin)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.equal(400)
          done()
        })
    })

    it('should return 200 and our token', done => {
      chai
        .request(server)
        .post(signin)
        .send(preSave)
        .end((err, res) => {
          expect(res.status).to.be.equal(200)
          expect(res.body).not.to.be.empty
          expect(res.body).to.have.property('token')
          done()
        })
    })
  })
})

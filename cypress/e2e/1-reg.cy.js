import {faker} from '@faker-js/faker'
import {registration} from '../pages/reg'
import spok from 'cy-spok';
const api_server = Cypress.env('api_server')
expect(api_server, 'api_server').to.be.a('string').and.not.be.empty

describe('Register new client', () => {
  const email = faker.internet.email()
  const username = faker.person.fullName()
  it('positive new user', () => {
    const data = {
      email: email,
      password: '123',
      username: username,
    }
    registration.registerNewClient(api_server, data)
      .should(spok({
        status: 201,
        body: {
          user: {
            id: spok.number,
            email,
            username,
            token: spok.string,
          },
        },

      }))
  })
})

describe('Register new client negative', () => {
  const email = faker.internet.email()
  const username = faker.person.fullName()
  it('Register new client without email', () => {
    const data = {
      password: '123',
      username: username,
    }
    registration.registerNewClient(api_server, data)
      .should(spok({
        status: 422,
        body: {
          errors: {
            email: ["can't be blank"],
          },
        },
      }))
  })

  it('Register new client without username', () => {
    const data = {
      email: email,
      password: '123',
    }

    registration.registerNewClient(api_server, data)
      .should(spok({
        status: 422,
        body: {
          errors: {
            username: ["can't be blank"],
          },
        },
      }))
  })
})

const request = require('supertest')
const app = require('./server/routes/index')

describe('Test the root path of node', () =>{
    test('It should response the get method', () => {
        request(app).get('/student').then((response) => {
            expect(response.statusCode).toBe(200);
           
        })
    })
})
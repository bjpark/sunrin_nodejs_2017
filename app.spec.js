const { expect } = require('chai'); 
const request = require('supertest');

const app = require('./app');

describe('My first test code', () => {
    it('hello world', (done) => {
        expect(true).to.equal(true);
        done();
    })
});

describe('My first API test', () => {
    it('it must be Hello Test', (done) => {
        request(app).get('/api/test').expect(200).end((err, data) => {
            if (err) {
                return done(err);
            }
            expect(data.text).to.equal('Hello Test');
            done();
        })
    })
})
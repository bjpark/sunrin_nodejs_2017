const { expect } = require('chai'); 
const request = require('supertest');

const app = require('./app');

describe('My first test code', () => {
    it('hello world', (done) => {
        expect(true).to.equal(false);
        done();
    })
});
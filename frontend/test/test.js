var should = require('should').expect;
var request = require('request').expect;
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest("http://localhost:8000/")


// Test suite
describe('Mocha', function () {
	// Test spec (unit test)
	it('should run our tests using npm', function () {
		expect(true).to.be.ok;
	});
});

describe("GET", function() {
  describe("homepage and check for valid response", function() {
    it("should return a 200 response", function(done) {

            api.get("/")
            .set("Accept", "application/json")
            .expect(200,done);
          });
      });
  });

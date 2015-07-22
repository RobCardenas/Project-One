var request = require('request');
var expect = require('chai').expect;
var users = require("../server.js");

describe('https://merch-connect.herokuapp.com/', function() {
	it('should have an HTTP of 200 - success', function(done) {
		request('https://merch-connect.herokuapp.com/', function(err, res, body) {
			expect(res.statusCode).to.equal(200)
			done();
		})
	})
});

describe('https://merch-connect.herokuapp.com/', function() {
	it('should have an HTTP of 200 - api/posts', function(done) {
		request('https://merch-connect.herokuapp.com/api/posts', function(err, res, body) {
			expect(res.statusCode).to.equal(200)
			done();
		})
	})
});

describe('https://merch-connect.herokuapp.com/', function() {
	it('should have an HTTP of 200 - home', function(done) {
		request('https://merch-connect.herokuapp.com/home', function(err, res, body) {
			expect(res.statusCode).to.equal(200)
			done();
		})
	})
});

describe('https://merch-connect.herokuapp.com/', function() {
	it('should have an HTTP of 200 - logout', function(done) {
		request('https://merch-connect.herokuapp.com/logout', function(err, res, body) {
			expect(res.statusCode).to.equal(200)
			done();
		})
	})
});
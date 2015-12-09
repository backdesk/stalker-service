var supertest = require('supertest')
  , config = require('../config/config')()
  , should = require('should');

var app = require('../app.js');

var server = supertest.agent(app.listen(config.port));

describe('/leads', function () {
	it('should return an array of leads', function (done) {
		server
			.get('/leads')
		  .expect('Content-type',/json/)
    	.expect(200)
      .end(function(err, res) {
        res.body.should.be.an.Object();

        res.body.should.have.property('leads')
          .and.be.an.Array();

        res.body.should.have.property('total')
          .and.be.a.Number();

        res.body.leads.length.should.equal(res.body.total);

    		done();
    	});
	});
});

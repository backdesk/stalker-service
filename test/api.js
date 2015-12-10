var supertest = require('supertest')
  , config = require('../config/config')()
  , should = require('should');

var app = require('../app.js');

var server = supertest.agent(app.listen(config.port));

describe('sources api', function () {

});

describe('leads api', function () {
  var id;

  it('creates a lead', function (done) {
    server
      .post('/leads')
      .set('Content-Type','application/json')
      .send({ details : 'Test Lead', status: 'junk' })
      .expect('Content-type',/json/)
      .expect(201)
      .end(function(err, res) {
        if(err) return done(err);

        id = res.body._id;

        done();
      });
  });

	it('returns a list of leads', function (done) {
		server
			.get('/leads')
		  .expect('Content-type',/json/)
      .expect(200)
      .end(function(err, res) {
        if(err) return done(err);

        res.body.should.be.an.Object();

        res.body.should.have.property('leads')
          .and.be.an.Array();

        res.body.should.have.property('total')
          .and.be.a.Number();

        res.body.leads.length.should.equal(res.body.total);

    		done();
    	});
	});

  it('retrieves a lead by id', function (done) {
    server
      .get('/leads/' + id)
      .expect('Content-type',/json/)
      .expect(200, done)
  });

  it('deletes a lead', function (done) {
    server
      .del('/leads/' + id)
      .expect(204, done)
  });
});

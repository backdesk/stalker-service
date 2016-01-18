var supertest = require('supertest')
  , should = require('should')
  , config = require('../config/config')();

var app = require('../app.js');

var server = supertest.agent(app.listen(config.port));

describe('sources', function () {
  var current_id, source = {
    name: 'Test User',
    type: 'agent',
    phone: '04544 454 543',
    notes: 'Testing 123'
  };

  it('create a new source', function (done) {
    server
      .post('/sources')
      .set('Content-Type', 'application/json')
      .send(source)
      .expect(201)
      .expect('Content-Type',/json/)
      .end(function (err, res) {
        if (err) return done(err);

        res.body.should.have.property('id');
        res.body.created_at.should.not.be.null();
        res.body.name.should.equal('Test User');
        res.body.type.should.equal('agent');

        current_id = res.body.id;

        done();
      });
  });

  it('list sources', function (done) {
    server
      .get('/sources')
      .set('Content-Type', 'application/json')
      .expect(200)
  });

  it('optionally paginate sources', function (done) {

  });

  it('update an existing source', function (done) {
    server
      .put('/sources/' + current_id)
      .set('Content-Type', 'application/json')
      .send({
        name: 'Test User',
        type: 'agent',
        status: 'chasing'
      })
      .expect(200)
      .expect('Content-Type',/json/)
      .end(function (err, res) {
        if (err) return done(err);

        res.body.status.should.equal('chasing');
        res.body.updated_at.should.not.be.null();

        done();
      });
  });

  it('run validation when updating an existing source', function (done) {
    server
      .put('/sources/' + current_id)
      .set('Content-Type', 'application/json')
      .send({
        name : ''
      })
      .expect(400, done);
  });

  it('mark a source for deletion', function (done) {
    server
      .delete('/sources/' + current_id)
      .expect(204, done)
  });
});

describe('leads', function () {

});
const assert = require('chai').assert,
    request = require('request');

const L = require('./../../index'),
    ControllerResolver = L.resolver,
    app = L.app;


describe('LoaderTest', () => {
    
    before(() => {
        let storage = [
        { id: 1, name: 'UserOne' },
        { id: 2, name: 'UserTwo' },
        { id: 3, name: 'UserThree' }
        ];
        
        app.get('/v1/users', (Request, Response) => {
            
            return Response.status(200).json({
                status: true,
                data: storage
            });
        });
        
        app.post('/v1/users', (Request, Response) => {
            let obj = Request.body;

            return Response.status(200).json({
                status: true,
                data: obj
            });
        });

        app.get('/simple-mvc-route', new ControllerResolver('TestingController@index')
            .handle());
        
        app.run(3000);
    });
    
    describe('making get request', () => {
        it('Should validate content found in GOT url', (done) => {
            request
                .get("http://localhost:3000/v1/users")
                .on('response', (Response) => {
                    assert.equal(200, Response.statusCode);                
                }).on('data', (data) => {
                    data = JSON.parse(data.toString());
                    assert.isTrue(data.status);
                    assert.equal(3, data.data.length);

                    done();  
                });
        });

        it('Should validate if it\'s a valid URL', (done) => {
            request.get('http://localhost:3000/v1/other-url-inexistent')
                .on('response', (Response) => {
                    assert.equal(404, Response.statusCode);
                    done();
                });
        });
    });
    
    describe('making post requests', () => {
        it('Should validate a post request for inserting data', (done) => {
            request
                .post({
                    url: 'http://localhost:3000/v1/users',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 4,
                        name: 'UserFour'
                    })
                })
                .on('response', (Response) => {
                    assert.equal(200, Response.statusCode);
                }).on('data', (data) => {
                    data = JSON.parse(data.toString());
                    assert.isTrue(data.status);

                    done();
                });
        });
    });

    describe('making request for a simple mvc route', () => {
        it('Should respond with "OK"', done => {
            request
                .get('http://localhost:3000/simple-mvc-route')
                .on('response', Response => assert.equal(200, Response.statusCode))
                .on('data', data => {
                    assert.equal('OK', data.toString());

                    done();
                });
        });
    });

    describe('making requests to auto generated urls', () => {
        it('Should respond with a 403 and a JSON explaining why', done => {
            request
                .get('http://localhost:3000/testing/api-test')
                .on('data', data => {
                    console.log(data.toString());
                    done();
                });
        });
    });
    
    after(() => {
        L.app.turnDown();
    });
    
});
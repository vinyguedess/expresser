const assert = require('chai').assert,
    request = require('request');

const L = require('./../../index');


describe('LoaderTest', () => {
    
    before(() => {
        let storage = [
        { id: 1, name: 'UserOne' },
        { id: 2, name: 'UserTwo' },
        { id: 3, name: 'UserThree' }
        ];
        
        L.app.get('/v1/users', (Request, Response) => {
            
            return Response.status(200).json({
                status: true,
                data: storage
            });
        });
        
        L.app.post('/v1/users', (Request, Response) => {
            let obj = Request.body;

            return Response.status(200).json({
                status: true,
                data: obj
            });
        });
        
        L.app.run(3000);
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
    
    after(() => {
        L.app.turnDown();
    });
    
});
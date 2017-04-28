const assert = require('chai').assert;

const Config = require('./../../src/Core/Config'),
    Url2ControllerResolver = require('./../../src/Core/MVC/Url2ControllerResolver');

var sender = (message) => {
    return message;
};


describe('Url2ControllerResolverTest', () => {

    Config.set('mvc.routes.defaults.domain', 'DomainName');
    Config.set('mvc.routes.defaults.action', 'indexAction');

    describe('Getting a simple controller by simulating URLs', () => {
        
        it('Should return action accordling to URL', () => {
            Config.set('mvc.routes.defaults.controller', 'TestingController');

            let resolver = new Url2ControllerResolver();

            assert.equal('OK', resolver.handle({ url: '/'}, {send: sender}));
            assert.equal('OK', resolver.handle({ url: '/testing'}, {send: sender}));
            assert.equal('OK', resolver.handle({ url: '/testing/index'}, {send: sender}));
        });

        it('Should use routes based in DDD', () => {
            Config.set('mvc.routes.style', 'ddd');
            Config.set('mvc.routes.defaults.controller', 'DddController');

            let resolver = new Url2ControllerResolver();

            assert.throw(() => resolver.handle({url: '/'}, {send: sender}));
            assert.throw(() => resolver.handle({url: '/domain-name'}, {send: sender}))
            assert.throw(() => resolver.handle({url: '/domainName/ddd'}, {send: sender}));
            assert.equal('Hello me', resolver.handle({url: '/domain_name/ddd/ddd'}, {send: sender}));
        });

    });

});
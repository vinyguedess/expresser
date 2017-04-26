const assert = require('chai').assert;

const Config = require('./../../src/Core/Config'),
    ControllerResolver = require('./../../src/Core/MVC/ControllerResolver');


describe('ControllerResolverTest', () => {

    Config.set('mvc.path.controllers', 'test/DataProvider/');

    describe('getting selected controller\'s action', () => {

        it('Should return an action from selected controller', () => {
            assert.isFunction(new ControllerResolver('TestingController@indexAction')
                .handle());
        });

    });

    describe('getting defined action without mention its suffix', () => {
        it('Should get action with non mentioned suffix', () => {
            assert.isFunction(new ControllerResolver('TestingController@index')
                .handle()); 
        });
    });

    describe('getting default action in case it\'s not defined', () => {
        
        it('Sould get action without it being mentioned', () => {
            assert.isFunction(new ControllerResolver('TestingController@').handle());
        });

    });

    describe('getting error trying non existent controllers and actions', () => {
        it('Should throw exception because controller does not exist', () => {
            assert.throw(
                () => {
                    new ControllerResolver('OtherController@indexAction').handle();
                },
            'Requested controller OtherController does not exist');
        });

        it('Should throw exception on not existent action', () => {
            assert.throw(
                () => {
                    new ControllerResolver('TestingController@addAction').handle();
                },
                'Requested action addAction from TestingController does not exist'
            );
        });
    });

    describe('applying DDD Concept and loading a controller of a Domain', () => {
        it('Should load a Controller from a defined domain', () => {
            let resolver = new ControllerResolver('DomainName@DDDController@dddAction');
            assert.isFunction(resolver.handle());
        });
    });

});
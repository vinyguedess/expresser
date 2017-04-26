const assert = require('chai').assert;

const L = require('./../../index');

describe('ConfigTest', () => {
    
    let config = L.config;
    
    describe('setting configuration parameters', () => {
        
        it('Should set some config information to file', () => {
            config.set('what.do.you.mean', 'uh uh uh');
            assert.equal('uh uh uh', config.get('what.do.you.mean'));
        });
        
    });

    describe('getting configuration parameters', () => {

        config.set('glory', 'amen');
        config.set('darth', { 'first': 'andeddu', 'last': 'vader' });

        it('Should return default value in case nothing is found', () => {
            assert.isNull(config.get('frozen'));
            assert.equal(123, config.get('frozen', 123));
        });

        it('Should get exaclty the value requested', () => {
            assert.equal('amen', config.get('glory'));
            assert.equal('vader', config.get('darth').last);    
        });

        it('Should get value by alias', () => {
            assert.equal('andeddu', config.get('darth.first'));
            assert.isNull(config.get('darth.main'));
            assert.equal('andeddu', config.get('darth.first'));
        });

    });

    describe('registering a config object', () => {
        config.register({
            'database': {
                'relational': 'mysql',
                'nonrelational': 'mongodb'
            },
            'code': {
                'backend': {
                    'base': 'javascript',
                    'framework': 'express'
                },
                'frontend': {
                    'framework': 'angularjs'
                }
            }
        });

        it('Should test if config object was well registered', () => {
            assert.equal('mysql', config.get('database.relational'));
            assert.equal('mongodb', config.get('database.nonrelational'));
            assert.equal('javascript', config.get('code.backend.base'));
            assert.equal('express', config.get('code.backend.framework'));
            assert.equal('angularjs', config.get('code.frontend.framework'));
        });
    });

    describe('registering a config file', () => {
        config.register('src/Config/mvc');

        it('Should test if config object was well registered', () => {
            assert.isTrue(config.get('mvc.suffix.controllers'));
        });
    });
    
});
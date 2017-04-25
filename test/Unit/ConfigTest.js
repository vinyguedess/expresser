const Config = require('./../../src/Core/Config');

describe('ConfigTest', () => {

    let config = Config;

    describe('setting configuration parameters', () => {
        config.set('what.do.you.mean', 'uh uh uh');
    });

});
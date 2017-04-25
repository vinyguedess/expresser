const Loader = require('./src/Core/Loader');
const Config = require('./src/Core/Config');

let loader = new Loader();

module.exports = {
    'loader': loader,
    
    'config': Config
};
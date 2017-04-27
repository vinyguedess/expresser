const path = require('path'),
    Loader = require('./src/Core/Loader'),
    Config = require('./src/Core/Config');

global.appRoot = process.cwd();

let loader = new Loader();

module.exports = {
    'app': loader,
    
    'config': Config
};
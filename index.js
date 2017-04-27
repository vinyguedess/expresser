const path = require('path'),
    Loader = require('./src/Core/Loader'),
    ControllerResolver = require('./src/Core/MVC/ControllerResolver');

global.appRoot = process.cwd();

let loader = new Loader();

module.exports = {
    'app': loader,
    
    'config': loader._getConfig(),
    'resolver': ControllerResolver
};
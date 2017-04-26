const express = require('express'),
    bodyParser = require('body-parser');

const ControllerResolver = require('./MVC/ControllerResolver');


class Loader {

    constructor()
    {   
        this.app = express();

        this.register(bodyParser.urlencoded({ extended: false }));
        this.register(bodyParser.json());
    }

    get(url, callback)
    {
        if (typeof callback === 'string')
            callback = new ControllerResolver(callback).handle();

        this.app.get(url, callback);
    }

    post(url, callback)
    {
        if (typeof callback === 'string')
            callback = new ControllerResolver(callback).handle();
            
        this.app.post(url, callback);
    }

    register(callback)
    {
        this.app.use(callback);
    }

    run(port)
    {        
        if (typeof port === 'undefined')
            port = 3000;

        this.server = this.app.listen(port, () => {
            // console.log('Application running at port ' + port);
        });
    }

    turnDown()
    {
        if (typeof this.server !== 'undefined')
            this.server.close();
    }

}

module.exports = Loader;
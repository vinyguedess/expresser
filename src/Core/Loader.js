const express = require('express'),
    bodyParser = require('body-parser');

const Config = require('./Config'), 
    ControllerResolver = require('./MVC/ControllerResolver'),
    Url2ControllerResolver = require('./MVC/Url2ControllerResolver');


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

        if (Config.get('mvc.routes.auto', true))
            this.app.all('/*', (req, res) => {
                return new Url2ControllerResolver().handle(req, res);
            });

        this.server = this.app.listen(port, () => {
            // console.log('Application running at port ' + port);
        });
    }

    turnDown()
    {
        if (typeof this.server !== 'undefined')
            this.server.close();
    }

    _getConfig()
    {
        Config.register({
            "mvc": {
                "suffix": {
                    "controllers": true
                },
                "path": {
                    "controllers": "src/Controllers/"
                },
                "routes": {
                    "auto": true,
                    "style": "simple",
                    "defaults": {
                        "domain": null,
                        "controller": "MainController",
                        "action": "indexAction"
                    }
                }
            }
        });

        return Config;
    }

}

module.exports = Loader;
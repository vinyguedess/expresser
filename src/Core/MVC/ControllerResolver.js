const fs = require('fs');

const Config = require('./../Config');


class ControllerResolver
{

    constructor(controllerAction)
    {
        this.setControllerAction(controllerAction);
        this._prepareConfigurations();
    }

    setControllerAction(controllerAction)
    {
        controllerAction = controllerAction.split('@');
        this.controller = controllerAction[0];

        this.action = controllerAction[1];
        if (this.action.length === 0)
            this.action = 'indexAction';

        if (this.action.substr(-6) !== 'Action')
            this.action += 'Action';
    }

    handle()
    {
        if (!this._checkIfControllerExists())
            throw new Error(`Requested controller ${this.controller} does not exist`);
        
        let Controller = require(`${this.controllersPath}${this.controller}`);
        Controller = new Controller();
        if (typeof Controller[this.action] === 'undefined')
            throw new Error(`Requested action ${this.action} from ${this.controller} does not exist`);

        return Controller[this.action];
    }

    _checkIfControllerExists()
    {
        if (typeof this.controllersPath === 'string')
            return fs.existsSync(`${this.controllersPath}${this.controller}.js`);

        return false;
    }

    _prepareConfigurations()
    {
        if (typeof Config.get('mvc.path.controllers') === 'string') {
            this.controllersPath = `${appRoot}/` + Config.get('mvc.path.controllers');
        }
    }

}

module.exports = ControllerResolver;
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
        if (controllerAction.length === 2)
            controllerAction = {
                domain: null,
                controller: controllerAction[0],
                action: controllerAction[1]
            }
        else if (controllerAction.length === 3)
            controllerAction = {
                domain: controllerAction[0],
                controller: controllerAction[1],
                action: controllerAction[2]
            }

        this.domain = controllerAction.domain;
        this.controller = controllerAction.controller;

        this.action = controllerAction.action;
        if (this.action.length === 0)
            this.action = 'indexAction';

        if (this.action.substr(-6) !== 'Action')
            this.action += 'Action';
    }

    handle()
    {
        if (!this._checkIfControllerExists())
            throw new Error(`Requested controller ${this.controller} does not exist`);
        
        let Controller = null;
        if (this.domain == null)
            Controller = require(`${this.controllersPath}/${this.controller}`);
        else
            Controller = require(`${this.controllersPath}${this.domain}/Controllers/${this.controller}`);

        Controller = new Controller();
        if (typeof Controller[this.action] === 'undefined')
            throw new Error(`Requested action ${this.action} from ${this.controller} does not exist`);

        return Controller[this.action];
    }

    _checkIfControllerExists()
    {
        if (this.domain === null)
            return fs.existsSync(`${this.controllersPath}${this.controller}.js`);

        let controllerFilePath = `${this.controllersPath}${this.domain}/`;
        controllerFilePath += `Controllers/${this.controller}.js`;

        return fs.existsSync(controllerFilePath); 
    }

    _prepareConfigurations()
    {
        this.controllersPath = `${appRoot}/` + Config.get('mvc.path.controllers');
    }

}

module.exports = ControllerResolver;
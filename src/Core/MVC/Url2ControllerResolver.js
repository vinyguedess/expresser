const Config = require('./../Config'),
    ControllerResolver = require('./ControllerResolver');


class Url2ControllerResolver
{

    constructor()
    {
        this.routeDDDStyle = Config.get('mvc.routes.style') === 'ddd';
        this.defaults = {
            domain: Config.get('mvc.routes.defaults.domain'),
            controller: Config.get('mvc.routes.defaults.controller'),
            action: Config.get('mvc.routes.defaults.action')
        }
    }

    handle()
    {
        let _this = this;

        return (Request, Response) => {
            let route = '';
            if (Request.url === '/' || Request.url.length === 1) {
                route = `${_this.defaults.controller}@${_this.defaults.action}`;
                if (_this.routeDDDStyle)
                    route = `${_this.defaults.domain}@` + route;

                let action = new ControllerResolver(route).handle();
                return action(Request, Response);
            }

            let url = Request.url.split("/").filter((el) => {
                return el.length > 0;
            }).map(el => _this.camelCasefy(el));

            if (this.routeDDDStyle)
                var [domain, controller, action] = url;
            else
                var [controller, action] = url;
                
            controller = controller.charAt(0).toUpperCase() + controller.slice(1);
            if (typeof action === 'undefined')
                    action = this.defaults.action;

            route = `${controller}Controller@${action}`;
            if (_this.routeDDDStyle) {
                domain = domain.charAt(0).toUpperCase() + domain.slice(1);
                route = `${domain}@${route}`;
            }

            let controllerAction = new ControllerResolver(route).handle();
            return controllerAction(Request, Response);
        }
    }

    camelCasefy(str)
    {
        str = str
            .split(' ').join('-')
            .split('_').join('-')
            .split('-')
            .map((el, index) => {
                if (index === 0)
                    return el;

                return el.charAt(0).toUpperCase() + el.slice(1);
            });
            

        return str.join('');
    }

}

module.exports = Url2ControllerResolver;
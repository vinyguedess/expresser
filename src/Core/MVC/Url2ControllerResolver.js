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

    handle(Request, Response)
    {
        let _this = this;

        let route = '';
        if (Request.url === '/' || Request.url.length === 1) {
            route = `${this.defaults.controller}@${this.defaults.action}`;
            if (this.routeDDDStyle)
                route = `${this.defaults.domain}@` + route;

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
        if (this.routeDDDStyle) {
            domain = domain.charAt(0).toUpperCase() + domain.slice(1);
            route = `${domain}@${route}`;
        }

        try {
            let controllerAction = new ControllerResolver(route).handle();
            
            return controllerAction(Request, Response);
        } catch (err) {
            let headers = Request.headers;
            if (typeof headers['content-type'] !== 'undefined' && headers['content-type'].indexOf('json') >= 0)
                return Response
                    .status(404)
                    .json({
                        status: false,
                        error: err.message
                    });

            return Response.status(404).send(err.message);
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
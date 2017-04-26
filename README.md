# expresser-boilerplate
![TravisCI](https://api.travis-ci.org/vinyguedess/expresser-boilerplate.svg?branch=master)
![Codecov](https://img.shields.io/codecov/c/github/vinyguedess/expresser-boilerplate.svg)
![NPM Version](https://img.shields.io/npm/v/expresser-boilerplate.svg)
![NPM Download](https://img.shields.io/npm/dt/expresser-boilerplate.svg)
![Licence](https://img.shields.io/npm/l/expresser-boilerplate.svg)

An [ExpressJS](https://npmjs.com/package/express) boilerplate for developing applications.

### Installation
```javascript
    npm install --save expresser-boilerplate
```

### Introduction
First of all you must require the package and run app
```javascript
    const expresser = require('expresser-boilerplate'),
        app = expresser.app;

    app.get('/', (Request, Response) => {

        return Response.send('Welcome to homepage');
    });

    app.run(3000);
```

Until there, it's exactly how express works and there's nothing different.
The cool stuff starts right now.

### Routing
Now you can style in many ways your route, even if you want to follow patterns of architecture like DDD (Domain Driven Design).

#### Simple MVC route
In simple MVC route you define controller and action like string: "Controller@Action".
```javascript

    class MyController
    {

        indexAction(Request, Response)
        {
            return Response.send('Hey, you\'re inside of Controller\'s Action');
        }

    }

    app.get('/', 'MyController@indexAction');
```
The rule number one here is that your action name must always end as "Action", in case you make a declaration like this "MyController@index" the parser will automatically look for the action named as "indexAction".

About the Controllers' folder, all controllers must be on "src/Controllers", but you can alter this path using Config service.
```javascript
    const Config = expresser.config;

    Config.set('mvc.path.controllers', 'src/MyApp/Controllers');
```

#### Domain Driven Design Routes
In this case, you will pass three informations in route declaration: "Domain@Controller@Action". In this case, we strongly recommend you to define in the configuration as shown above the domains path.

Folders structure:
- src/
    - UserDomain/
        - Controllers/
            - UserController.js

```javascript
    Config.set('mvc.path.controllers', 'src/');

    app.get('/', 'UserDomain@UserController@indexAction');
```

### Configuration
There's a service implemented called Config, some informations used by this boilerplate are in there and you can add or get information by using the following commands.
```javascript
    Config.set('development.backend.language', 'php');

    Config.get('development.backend.language'); //Should print "php"

    Config.get('non.existent.key', 'default-value-here'); //Should print "default-value-here"
```

### Testing
```bash
    npm run test
```

### Conclusion
In the end, this boilerplate in only a boilerplate, and the purpose is not doing something amazing, but give you a stage/platform so you can start develop your application using ExpressJS.
const express = require('express');


class Loader {

    constructor()
    {   
        this.app = express();
    }

    run()
    {
        let port = 3000;
        
        this.app.run(port, () => {
            console.log('Application running at port ' + port);
        });
    }

}

module.exports = Loader;
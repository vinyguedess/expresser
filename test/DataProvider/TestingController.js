

class TestingController
{

    constructor()
    {
        this.name = 'testing';
    }

    indexAction(Request, Response)
    {

        Response.send('OK');
    }

}

module.exports = TestingController;
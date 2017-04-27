

class TestingController
{

    constructor()
    {
        this.name = 'testing';
    }

    indexAction(Request, Response)
    {
        return Response.send('OK');
    }

    apiTestAction()
    {
        return Response.status(403).json({
            status: false,
            message: 'Unauthorizes'
        });
    }

}

module.exports = TestingController;
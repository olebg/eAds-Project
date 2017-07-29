const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/places', (req, res) => {
        return controller.getAll(req, res);
    });

    app.get('/places/:id', (req, res) => {
        return controller.getOne(req, res);
    });
    app.get('/api/places', (req, res) => {
        return controller.getAllapi(req, res);
    });
};

module.exports = { attachTo };

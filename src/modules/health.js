'use strict';

const {
    WELCOME_ADAPTER_MESSAGE
} = require('./utils/constants');

function healthRoutes(app) {

    app.get('/', function (req, res) {
        res.status(200);
        res.write(JSON.stringify({
            message: WELCOME_ADAPTER_MESSAGE
        }));
        res.end();
    });

    app.get('/health', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.end(JSON.stringify({
            status: 'UP'
        }));
    });
}

module.exports = healthRoutes;
'use strict';

const UserCRUDService = require ('../service/userCRUD-service');
const jwtHandler = require('../authentication/jwt-handler');
const logger   = require("../utils/log-service");

const router = require('express').Router();

let jwtService = new jwtHandler();
let crudservice = new UserCRUDService();

const routes = function (baseUrl, app) {

    //validate token
    app.use(baseUrl,  function (req, res, next) {
        jwtService.jwtVerify(req, res, next, 'api');
    });


    app.use(baseUrl, router);

    // get user by Id
    router.get('/user/:userId', (req, res) => {
        logger.info('fetching for userId ' + req.params.userId);
        crudservice.getUserById(req, res);
    });

    // get users
    router.get('/users', (req, res) => {
        logger.info('fetching all users ');
        crudservice.getAllUsers(req, res);
    });

    // create users
    router.post('/user', (req, res) => {
        logger.info('calling create');
        crudservice.create(req, res);
    });

    var sendResponse = function (status, message, response) {
        response.status(status).send({
        data: message
    });
  };
};

module.exports = routes;

'use strict';

const User = require('../domain/User');
const logger = require('../utils/log-service');
const request = require('request');
const dataTransformer = require('../dataTransformation/transformer');
const { PROVIDER_BASE_URL : PROVIDER_BASE_URL} = require('../utils/constants');
const Validator = require('../utils/validation');

let validator = new Validator();

class UserCRUDService {
    constructor(){}

    getAllUsers(req, res) {  

        new Promise(function(resolve, reject) {
            request.get(PROVIDER_BASE_URL + 'users', function(err, resp, body) {
                if (err) {
                    logger.error('in error' + err);
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(err);
                    reject(err);
                } else {
                    logger.info('resolving' + body);

                    //transform data before response
                    let transformer = new dataTransformer();
                    body = transformer.transformRead(body);


                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(body);
                    resolve(body);
                }
            });
        });

    }
       

    getUserById(req, res) {   

        new Promise(function(resolve, reject) {
            if(validator.isNullOrUndefined(req.params.userId)) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end('missing required parameters');
                reject('missing required parameters');
            }       
            const  userId  = req.params.userId;
                let URL = PROVIDER_BASE_URL + 'user/' + userId;
            request.get(URL, function(err, resp, body) {
                if (err) {
                    logger.error('in error' + err);
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(err);
                    reject(err);
                } else {
                    logger.info('resolving' + body);
                    
                    //transform data before response
                    let transformer = new dataTransformer();
                    body = transformer.transformRead(body);

                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(body);
                    resolve(body);
                }
            });
        });

    }

    create(req, res) {
        const { userId, name, age } = req.body;
        return new Promise((resolve, reject) => {

            logger.info(' in promise');
            if ( (validator.isNullOrUndefined(userId))  || ((validator.isNullOrUndefined(name))) ) {
                logger.error('missing required parameters');
                reject('missing required parameters');
            } else {
                logger.info('calling provider service');
                
                var user = new User(userId);
                user.name = name;
                user.age = '';
                if((!validator.isNullOrUndefined(age))){
                    user.age = age;    
                }

                //transform data before response
                let transformer = new dataTransformer();
                let body = transformer.transformCreate(user);

                logger.info('body ' + body);
                logger.info('setting post options');

                let postOptions = {
                        url: PROVIDER_BASE_URL + 'user/',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': '*/*'
                        },
                        body: body
                    };
                    
                    request.post(postOptions, function(err, resp, body) {
                        if (err) {
                            logger.error('in error' + err);
                            res.writeHead(400, {'Content-Type': 'application/json'});
                            res.end(err);
                            reject(err);
                        } else {
                            logger.info('resolving' + body);
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(body);
                            resolve(body);
                        }
                    });
            }
        });
    }
                

}

module.exports = UserCRUDService;
'use strict';

const User = require('../domain/User');
const logger = require('../utils/log-service');
const Mapper = require('../mappers/user-mapper');
const Validator = require('../utils/validation');

let validator = new Validator();

//class to manage all data transformation code

class DataTransformer {
    constructor(){}

    transformRead(body){
        //transform , map and respond
        try {                
            let jsonData = JSON.parse(body);
            if (jsonData === undefined || jsonData.errorCode) {
                logger.error('MAPPING ERROR: ${JSON.stringify(jsonData)}');

                return { errorMessage: ' mapping error.' };                                                              
            }

            logger.info('json data' + jsonData);
            if(validator.isNullOrUndefined(jsonData.data)){
                logger.error('MAPPING ERROR: ${JSON.stringify(jsonData)}');
            }

            let usersProvider =  jsonData.data;
            let mapper = new Mapper();
            let userJSON = JSON.stringify(mapper.mapUser(usersProvider));
            logger.info('user after mapping is ' + userJSON);

            return(userJSON);
        }
        catch(error) {                
            throw error;
        }        
        
    }

    transformCreate(user){
        //transform , map and respond
        try {
            let mapper = new Mapper(); 
            let userJSON = JSON.stringify(mapper.mapFromUser(user));
            logger.info('user after mapping is ' + userJSON);

            return(userJSON);
        }
        catch(error) {                
            throw error;
        }        
        
    }
}


module.exports = DataTransformer;
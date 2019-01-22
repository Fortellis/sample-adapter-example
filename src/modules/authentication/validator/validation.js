'use strict';

const { logService: logger } = require('../../utils/log-service');

    function checkInputLength(value, message){
        if(!value){
            throw new Error(message);
        }
    }
    function checkTokenLength(authorizationHeader){
        if (!authorizationHeader) {
            logger.error({
                message: 'Forbidden Error',
                details: 'JWT token is missing'
            });
            throw new Error('JWT token is missing');
        }
        let parts = authorizationHeader.split(' ');
        if(parts.length === 2) return;
        if (parts.length !== 2) {
            logger.error({
                message: 'Forbidden Error',
                details: 'either scheme is missing or token is missing'
            });
            throw new Error('either scheme is missing or token is missing');
        }
    };

    function checkSchemeType(scheme){
        if (!(/^Bearer$/i.test(scheme))) {
            logger.error({
                message: 'Forbidden Error',
                details: 'jwt scheme is incorrect'
            });
            throw new Error('jwt scheme is incorrect');
        }
    };

    function checkJWTSyntax(token) {
        let jwtParts = token.split('.');
        if(jwtParts.length === 3) return ;
        if (jwtParts.length !== 3) {
            logger.error({
                message: 'Forbidden Error',
                details: 'jwt malformed'
            });
            throw new Error('jwt malformed');
        }
    };

    function checkPresenceOfKid(headerJson) {
         if (!headerJson.kid) {
            logger.error({
                message: 'Forbidden Error',
                details: 'jwt kid is missing'
            });
            throw new Error('jwt kid is missing');
        }
    };

    function parseTokenParts(tokenParts){
        try {
            let base64Value = new Buffer(tokenParts, 'base64');
            let asciiValue = base64Value.toString('ascii');
            let expectedJson = JSON.parse(asciiValue);
            return expectedJson;
        }catch(error){
            logger.error({
                message: 'Forbidden Error',
                details: `jwt does not look correct ${error}`
            });
            throw new Error('jwt does not look correct');
        }
    };

    module.exports = {
        checkTokenLength,
        checkSchemeType,
        checkJWTSyntax,
        checkPresenceOfKid,
        parseTokenParts,
        checkInputLength
    };
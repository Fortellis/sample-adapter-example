'use strict';

const  logger = require('../utils/log-service');
const jwt = require('jsonwebtoken');
const pkClientConst = require('./configurator/configuration.js');
const validator = require('./validator/validation.js');
const jwksClient = require('jwks-rsa');

let clientApi = jwksClient(pkClientConst.jwksRsaClientApiData);
let clientAdmin = jwksClient(pkClientConst.jwksRsaClientAdminData);

logger.setContext('JWT-VALIDATION');

    module.exports.verifyPayloadAgainstClaims =  function(authorizationHeader, callType, callback)
    {   
        validator.checkInputLength(callType, 'call type cannot be empty');
        callType = callType.toLowerCase();

        validator.checkTokenLength(authorizationHeader);
        let parts = authorizationHeader.split(' ');
        let scheme = parts[0], token = parts[1];
        validator.checkSchemeType(scheme);
        validator.checkJWTSyntax(token);
        let jwtParts = token.split('.');
        let headerJson = validator.parseTokenParts(jwtParts[0]);
        validator.checkPresenceOfKid(headerJson);

        let client = initializeClient(callType) ;
        client.getSigningKey(headerJson.kid, (err, key) => {
            if(key) {
                let signingKey =  key.rsaPublicKey;
                try {
                    jwt.verify(token, signingKey, pkClientConst.verificationClaims);
                    callback(null);
                }catch(verificationError){
                    logger.error({
                        message: 'Forbidden Error',
                        details: `Failed to verify the token; ${verificationError}`
                    });
                    callback(verificationError);
                }
            }
            if(err){
                logger.error({
                    message: 'Forbidden Error',
                    details: `Failed to get key from server; ${err}`
                });
                callback(err);
            }
        });
    };

    function initializeClient(callType){
        let client;
        if(callType===pkClientConst.CALL_TYPE_API){
            client = clientApi;
            pkClientConst.verificationClaims = Object.assign(pkClientConst.verificationClaims, {issuer: `${pkClientConst.API_URL}`});
            pkClientConst.verificationClaims = Object.assign(pkClientConst.verificationClaims, {audience: `${pkClientConst.API_AUDIENCE}`});
        }
        if(callType===pkClientConst.CALL_TYPE_ADMIN){
            client = clientAdmin;
            pkClientConst.verificationClaims = Object.assign(pkClientConst.verificationClaims, {issuer: `${pkClientConst.ADMIN_URL}`});
            pkClientConst.verificationClaims = Object.assign(pkClientConst.verificationClaims, {audience: `${pkClientConst.ADMIN_AUDIENCE}`});
        }
        
        return client;
    }






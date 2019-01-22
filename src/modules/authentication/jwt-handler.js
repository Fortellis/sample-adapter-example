'use strict';

const logger  = require('../utils/log-service');
const jwtVerifier = require('./jwt-verifier');
const responseHandler = require('./response-handler');


class JWTHandler {

  
  constructor() {}

  static setContext(context) {
    logger.setContext(context);
  }

  jwtVerify(req, res, next, callType) {
    let authoizationHeader = req.headers['authorization'];
    let start = new Date();
    try {
      jwtVerifier.verifyPayloadAgainstClaims(authoizationHeader, callType, (verificationError) => {
        if (verificationError) {
          responseHandler.errorResponse(res, 403, verificationError.message, 'moduleNameJwt');
          logger.error({
            code: 403,
            message: 'Authorization Failure',
            details: `JWT verification failed with error ${verificationError}`
          });
        } else {
          next();
        }
      });
    } catch (authorizationError) {
      responseHandler.errorResponse(res, 403, authorizationError.message, 'moduleNameJwt');
      logger.error({
        code: 403,
        message: 'Authorization Failure',
        details: `JWT verification failed with error ${authorizationError}`
      });
    } finally {
      let end = new Date() - start;
      logger.info(`execution time for jwt verification is ${end} milliseconds`);
    }
  }
}

module.exports = JWTHandler;
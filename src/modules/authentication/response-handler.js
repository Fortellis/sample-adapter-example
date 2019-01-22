'use strict';

class ResponseHandler {
  static asyncResponseHandler(service) {
    return async function (req, res, next) {
      const serviceResponse = await service(req);
      res.status(serviceResponse.httpCode);
      delete serviceResponse.httpCode;
      res.json(serviceResponse);
    }
  }

  static errorResponse(res, status, message, moduleName) {
    moduleName = (typeof moduleName === 'undefined') ? null : moduleName;
    res.setHeader('Content-Type', 'application/json');
    res.status(status);
    res.end(JSON.stringify({
      ...(moduleName ? {
        code: status
      } : {}),
      message: message
    }));
  }
}

module.exports = ResponseHandler;
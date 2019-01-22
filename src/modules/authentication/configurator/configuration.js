'use strict';
require('dotenv').config({
    path: 'config/.env'
});

const API_URL  = process.env.okta_url; 
const ADMIN_URL  = process.env.okta_url_admin;
const API_AUDIENCE = process.env.audience;
const ADMIN_AUDIENCE = process.env.audience_admin;

const CALL_TYPE_API = "api";
const CALL_TYPE_ADMIN = "admin";

let  jwksRsaClientApiData =    {
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri:`${API_URL}/v1/keys`
};

let  jwksRsaClientAdminData =    {
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri:`${ADMIN_URL}/v1/keys`
};


let verificationClaims = {
    algorithms: ['RS256']
};


module.exports = {
    API_URL: API_URL,
    ADMIN_URL: ADMIN_URL,
    API_AUDIENCE: API_AUDIENCE,
    ADMIN_AUDIENCE: ADMIN_AUDIENCE,
    CALL_TYPE_API: CALL_TYPE_API,
    CALL_TYPE_ADMIN: CALL_TYPE_ADMIN,
    jwksRsaClientApiData: jwksRsaClientApiData,
    jwksRsaClientAdminData: jwksRsaClientAdminData,
    verificationClaims: verificationClaims
};
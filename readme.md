### Contents
* express server
* helmet assisted security vulnerability checks
* jwt verification
* mapping/data tranformation
* call to backend sample provider

This is a sample adapter example. It acts as an integration layer with the sample provider service exposing 3 end points - getAllUsers, getUserById, createUser. The adapter service does a JWT verification with the Fortellis IDP OKTA URL. It needs a valid JWT token to work. 

### API Supported

Endpoints

GET / - welcome endpoint
GET /health - health endpoint
GET /v1/userService/users - to get all users
GET /v1/userService/user/{id} - to get a user by Id
POST /v1/userService/user - to create new user

### Modules

* authentication
    Fortellis JWT verifier
* controller
    controller/router objects
* dataTransformation
    Used as interface between provider and specs
* domain
    user domain objects
* mappers
    Data mapping/conversion
* service
    All services like provider service, userCRUD service
* utils
    utility services like logging

### Local development
* npm install(install version of node above 8)
* npm start

### Deployment
* npm install
* npm start


 
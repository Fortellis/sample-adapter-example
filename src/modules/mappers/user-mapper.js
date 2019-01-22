'use strict';

const User = require('../domain/User');
const logger = require('../utils/log-service');
const Validator = require('../utils/validation');
const ProviderUser = require('../domain/ProviderUser');

let validator = new Validator();

class Mapper {

    constructor(){}

    mapUser(usersProvider) {

        try{
            let users = [];
            usersProvider.forEach(element => {
                let user = new User();
                user.userId = element.userId;
                user.name = element.firstName;
                if(!validator.isNullOrUndefined(element.lastName)){
                    user.name = user.name + " " + element.lastName;
                }
                if(!validator.isNullOrUndefined(element.age)){
                    user.age = element.age;
                }
                users.push(user);
            });
            return users;
        } catch(e) {
            throw e;
        }

    }

    mapFromUser(user) {

        try{
            let providerUser = new ProviderUser();
            
            providerUser.userId = user.userId;
            providerUser.userAge = user.age;
            let names = user.name.split(' ');
  
            providerUser.userFirstName = names[0];
            
            if(!validator.isNullOrUndefined(names[1])) {
                providerUser.userLastName = names[1];
            }
            return providerUser;

        } catch(e) {
            throw e;
        }

    }

}

module.exports = Mapper;
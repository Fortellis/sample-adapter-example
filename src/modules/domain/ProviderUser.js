'use strict';


class ProviderUser {
    
    constructor(userId){
        this.userId = userId;
    }

    set firstName(firstName) {
        this.userFirstName = firstName;
    }

    get firstName() {
        return this.userFirstName;
    }

    set lastName(lastName) {
        this.userLastName = lastName;
    }

    get lastName() {
        return this.userLastName;
    }

    set age(age) {
        this.userAge = age;
    }

    get age(){
        return this.userAge;
    }

     
    toJSON() {
        return {
            'userId': this.userId,
            'userFirstName': this.userFirstName,
            'userLastName': this.userLastName,
            'userAge' : this.userAge
        };

    }
    
}

module.exports = ProviderUser;

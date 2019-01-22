'use strict';


class User {
    
    constructor(userId){
        this.userId = userId;
    }

    set name(name) {
        this.userName = name;
    }

    get name() {
        return this.userName;
    }

    set age(age) {
        this.userAge = age;
    }

    get age(){
        return this.userAge;
    }
    
}

module.exports = User;

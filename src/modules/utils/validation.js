'use strict';

class Validator {
    
    constructor() {}

    isNullOrUndefined(value) {
        if ( typeof value !== 'undefined' && value ) {
            return false;
        }
        return true;
    }

}

module.exports = Validator;
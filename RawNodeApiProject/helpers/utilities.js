// utilities function

// module scaffolding

const utilities = {};
const crypto = require('crypto');
const environment = require('./environment');

utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
    return output;
};
// hash string
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', environment.secretKey).update(str).digest('hex');
        return hash;
    }
    return false;
};
utilities.createRandomString = (strlength) => {
    let length = strlength;
    length = typeof strlength === 'number' && strlength > 0 ? strlength : false;
    if (length) {
        const possibleCharacter = 'qwertyuioplkjhgfdsazxcvbnm1234567890';
        let output = '';
        for (let i = 1; i <= length; i += 1) {
            const randomCharacter = possibleCharacter.charAt(
                Math.floor(Math.random() * possibleCharacter.length)
            );

            output += randomCharacter;
        }
        return output;
    }
    return false;
};

module.exports = utilities;

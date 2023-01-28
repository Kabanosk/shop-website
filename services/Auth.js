const crypto = require('crypto');

module.exports = class Auth{
    static async encrypt(text, salt){
        return crypto.pbkdf2Sync(text, salt, 1000, 64, `sha512`).toString(`hex`);
    }

    static async generateSalt(){
        return crypto.randomBytes(16).toString('hex');
    }
}
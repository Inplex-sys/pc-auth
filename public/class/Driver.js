const crypto = require('crypto');
const fs = require('fs');

class Driver {
    constructor() {
        this.password = null;
        this.session = false;
    }

    create( password ) {
        this.password = password;

        try {
            fs.writeFileSync( './containers.encrypted', this.encrypt( JSON.stringify( [] ) ) );
            this.session = true;
            return true;
        } catch {
            return false;
        }
    }

    login( password ) {
        this.password = password;
        if ( this.isPasswordValid() ) {
            this.session = true;
            return true;
        }
        return false;

    }

    isLoggedIn() {
        return this.session !== null;
    }

    containerExist() {
        return fs.existsSync( './containers.encrypted' );
    }

    isPasswordValid() {
        try {
            this.read();
            return true;
        } catch {
            return false;
        }
    }

    decrypt( data ) {
        const decipher = crypto.createDecipher('aes-256-cbc', this.password);
        let response = decipher.update(data.toString(), 'hex', 'utf8');
        response += decipher.final('utf8');
        return response;
    }

    encrypt( data ) {
        const cipher = crypto.createCipher('aes-256-cbc', this.password);
        let response = cipher.update(data, 'utf8', 'hex');
        response += cipher.final('hex');
        return response;
    }

    read() {
        return JSON.parse( this.decrypt( fs.readFileSync( './containers.encrypted' ) ) );
    }

    write( data ) {
        try {
            fs.writeFileSync( './containers.encrypted', this.encrypt( JSON.stringify( data ) ) )
            return true
        } catch {
            return false
        }
    }
}

module.exports = Driver;
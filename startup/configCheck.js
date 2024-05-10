const config = require('config') //This returns an object

const configCheck = () => {
    //This is a private key that is used to sign the token. This is stored in the config file
    if(!config.get('privateKey')) 
        throw new Error('FATAL ERROR: Private key is not set');
}

module.exports = configCheck;
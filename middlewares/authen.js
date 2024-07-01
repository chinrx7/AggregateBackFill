const axios = require('axios');
const logger = require('./log');

const { config } = require('./config');

const API = config.APIUrl;

module.exports.getToken = async () => {
    let token;
    const body = { user: "Solarsys", password: "PP@@ssw0rd555" };
    await axios.post(API + 'authen', body)
        .then(function (res) {
            token = res.data.Access.Token;
        })

    return token;
}

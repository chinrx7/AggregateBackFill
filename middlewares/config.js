const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./configure/config.json', 'utf8'));
const aggFig = JSON.parse(fs.readFileSync('./configure/agg.json', 'utf8'));

module.exports.config = config;
module.exports.aggConfig = aggFig;
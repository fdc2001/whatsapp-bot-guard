const sendLink = require("./sendLink");

const listRules = {
    'sendLink': sendLink,
}

const rulesEnabled = ['sendLink', 'getLink'];

exports.loader = async function loader (client,message) {


    for([key, value] of Object.entries(listRules)) {
        if(rulesEnabled.includes(key)) {
            await value.handler(client, message);
        }
    }

}

exports.getRules = function () {
    return listRules;
}

exports.getRulesEnabled = function () {
    return rulesEnabled;
}
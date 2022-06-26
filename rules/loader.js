const Group = require("../model/Group");
const listRules = {
    'sendLink': require("./sendLink"),
}

const availableRules = ['sendLink', 'getLink']

exports.loader = async function loader (client,message) {
    for([key, value] of Object.entries(listRules)) {
        const rulesEnabled = await getRulesEnabled(message);
        if(rulesEnabled.includes(key)) {
            await value.handler(client, message);
        }
    }

}

exports.getRules = function () {
    return listRules;
}

async function getRulesEnabled (message) {
    const chatId = message.chatId;
    const configs = await Group.findOne({chatId: chatId});
    if (configs!==null) {
        return configs.rules;
    }else{
        return []
    }
}
exports.getRulesEnabled = getRulesEnabled;


exports.allRulesAvailable = function () {
    return availableRules;
}
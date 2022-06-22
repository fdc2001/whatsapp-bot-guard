const {appName} = require("../config");
const loader = require("../rules/loader");

async function handler(client, message) {

    const rules = loader.getRules();
    const rulesEnabled = loader.getRulesEnabled();
    let messageText = appName+`Os regras ativadas são: \n`;

    for (const [,rule] of Object.entries(rules)) {
        if(rulesEnabled.includes(rule['name'])){
            messageText += `*${rule.title}* \n ${rule.description} \n\n`;
        }
    }

    return await client.sendText(message.chatId, messageText);
}

const signature={
    name: "regras",
    special: false,
    onlyAdmin: false,
    description: "Lista as regras ativas no grupo",
    handler
}

module.exports = signature;
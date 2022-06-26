const {appName} = require("../config");
const {getRulesEnabled} = require("../rules/loader");


async function handler(client, message) {
    const rulesEnabled = await getRulesEnabled(message);
    if(rulesEnabled.includes(signature.permission)) {
        const link = await client.getGroupInviteLink(message.chatId);
        await client.sendText(message.chatId, appName+`O link de partilha do grupo é:`);
        return await client.sendText(message.chatId,link);
    }else{
        return await client.sendText(message.chatId, appName+`O comando enviado não está habilitado, por favor fale com um administrador.`);
    }
}

const signature={
    name: "link",
    special: true,
    onlyGroup: true,
    onlyAdmin: false,
    onlyPrivate: false,
    description: "Comando para obter o link de partilha do grupo",
    handler,
    permission:'link',
    type:'function'
}

module.exports = signature;
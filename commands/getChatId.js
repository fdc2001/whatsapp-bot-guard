const {appName} = require("../config");

async function handler(client, message) {
    return await client.sendText(message.chatId, appName+`O id do chat é: ${message.chatId}`);
}

const signature={
    name: "chatID",
    special: false,
    onlyAdmin: true,
    onlyGroup: true,
    onlyPrivate: false,
    description: "Retorna o id do chat",
    hidden:true,
    handler
}

module.exports = signature;
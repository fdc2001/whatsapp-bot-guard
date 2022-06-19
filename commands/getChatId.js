const {appName} = require("../config");

async function handler(client, message) {
    return await client.sendText(message.chatId, appName+`O id do chat é: ${message.chatId}`);
}

const signature={
    name: "chatID",
    description: "Retorna o id do chat",
    handler
}

module.exports = signature;
const {appName} = require("../config");

async function handler(client) {
    await client.onAddedToGroup(async (chat) => {
        return await client.sendText(chat.id, appName+`Olá, sou um Bot para ajudar você a gerir o grupo e para manter tudo em ordem, para continar a cconfiguração envie no meu privado \n*/start*`);
    });
}

module.exports = handler;
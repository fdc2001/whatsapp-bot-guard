const {appName} = require("../config");

async function handler(client, message) {
    await client.setGroupToAdminsOnly(message.chatId, true);
    return await client.sendText(message.chatId, appName+`Grupo configurado para só administradores enviar mensagens.`);
}

const signature={
    name: "close",
    special: false,
    onlyAdmin: true,
    onlyGroup: true,
    onlyPrivate: false,
    description: "Comando para bloquear o envio de mensagens sem ser de administrador",
    handler
}

module.exports = signature;
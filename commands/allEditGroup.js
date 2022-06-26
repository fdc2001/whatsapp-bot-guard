const {appName} = require("../config");

async function handler(client, message) {
    await client.setGroupEditToAdminsOnly(message.chatId, false);
    return await client.sendText(message.chatId, appName+`A partir de agora todos podem editar o grupo.`);
}

const signature={
    name: "allEditGroup",
    special: false,
    onlyAdmin: true,
    onlyGroup: true,
    onlyPrivate: false,
    description: "Comando para definir a edição do grupo apenas para todos",
    handler
}

module.exports = signature;
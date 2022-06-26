const {appName} = require("../config");

async function handler(client, message) {
    await client.setGroupEditToAdminsOnly(message.chatId);
    return await client.sendText(message.chatId, appName+`A partir de agora apenas admins podem editar o grupo.`);
}

const signature={
    name: "onlyAdminEdit",
    special: false,
    onlyAdmin: true,
    onlyGroup: true,
    onlyPrivate: false,
    description: "Comando para definir a edição do grupo apenas para admins",
    handler
}

module.exports = signature;
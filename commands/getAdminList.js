const config = require("../config");

async function handler(client, message) {
    const adminList = await client.getGroupAdmins(message.chat.id);
    const host = (await client.getHostNumber()).toString()+'@c.us';


    let messageText = config.appName+`Os administradores do grupo são: \n`;
    for (const admin of adminList){
        if(admin!==host) {
            messageText += `@${admin.replace('@c.us', '')} \n`;
        }
    }
    return await client.sendTextWithMentions(message.chatId, messageText);
}

const signature={
    name: "admins",
    special: false,
    onlyAdmin: false,
    onlyGroup: true,
    onlyPrivate: false,
    description: "Retorna os administradores do grupo",
    handler
}
module.exports = signature;
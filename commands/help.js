const {appName} = require("../config");
const loader = require("./loader");

async function handler(client, message) {
    let messageText = appName+`Estes são os comandos disponiveis: \n`;

    const adminList = await client.getGroupAdmins(message.chat.id);

    const commands = loader.getCommands()
    let onlyAdmins=[], anyone = [];

    for (const [, command] of Object.entries(commands)) {
        if(command.onlyAdmin) {
            onlyAdmins.push(command);
        }else{
            anyone.push(command);
        }
    }

    messageText+= `\n*Comandos disponiveis para todos:* \n`;

    for (const command of anyone) {
        messageText += `*/${command.name}* - ${command.description} \n`;
    }

    if(adminList.includes(message.sender.id)){
        messageText+= `\n*Comandos disponiveis apenas para administradores:* \n`;

        for (const command of onlyAdmins) {
            messageText += `*/${command.name}* - ${command.description} \n`;
        }
    }

    return await client.sendText(message.chatId, messageText);
}

const signature={
    name: "help",
    special: false,
    onlyAdmin: false,
    description: "Envia a lista de comandos disponiveis",
    handler
}

module.exports = signature;
const {appName} = require("../config");
const loader = require("./loader");

async function handler(client, message) {


    if(message.isGroupMsg) {
        return await helpGroup(client, message);
    }else{
        return await helpPrivate(client, message);
    }

}

async function helpGroup(client, message) {
    const adminList = await client.getGroupAdmins(message.chat.id);

    const commands = loader.getCommands()
    let messageText = appName+`Estes são os comandos disponiveis: \n`;

    let onlyAdmins=[], anyone = [];

    for (const [, command] of Object.entries(commands)) {
        if(!command.hidden) {
            if (command.onlyAdmin) {
                onlyAdmins.push(command);
            } else {
                anyone.push(command);
            }
        }
    }

    messageText+= `\n*Comandos disponiveis para todos:* \n`;

    for (const command of anyone) {
        if(!command.hidden) {
            if (command.onlyPrivate === false) {
                messageText += `*/${command.name}* - ${command.description} \n`;
            }
        }
    }

    if(adminList.includes(message.sender.id)){
        messageText+= `\n*Comandos disponiveis apenas para administradores:* \n`;

        for (const command of onlyAdmins) {
            messageText += `*/${command.name}* - ${command.description} \n`;
        }
    }

    return await client.sendText(message.chatId, messageText);
}

async function helpPrivate(client, message) {
    const commands = loader.getCommands()
    let anyone = [];

    for (const [, command] of Object.entries(commands)) {
        if(!command.hidden) {
            anyone.push(command);
        }
    }

    let messageText = `\n*Comandos disponiveis:* \n`;

    for (const command of anyone) {
        if(!command.hidden) {
            if (command.onlyPrivate === true) {
                messageText += `*/${command.name}* - ${command.description} \n`;
            }
        }
    }

    return await client.sendText(message.chatId, messageText);
}

const signature={
    name: "help",
    special: false,
    onlyAdmin: false,
    onlyPrivate: false,
    onlyGroup:false,
    description: "Envia a lista de comandos disponiveis",
    handler
}

module.exports = signature;
const getAdminList = require("./getAdminList");
const getChatId = require("./getChatId");
const getLinkGroup = require("./getLinkGroup");
const getRules = require("./getRules");
const help = require("./help");

const listCommands = {
    'admins': getAdminList,
    'chatid': getChatId,
    'link': getLinkGroup,
    'regras': getRules,
    'help': help,
}

exports.loader = async function loader (client,message) {
    let command = message.body.split(' ')[0].replace('/', '');
    command=command.toLowerCase();
    console.log(listCommands)
    if (listCommands[command]) {
        return await listCommands[command].handler(client, message);
    }
    console.log(command)
}

exports.getCommands = function getCommands () {
    return listCommands;
}
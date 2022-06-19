const getAdminList = require("./getAdminList");
const getChatId = require("./getChatId");

exports.loader = async function loader (client,message) {
    const listCommands = {
        'admins': getAdminList,
        'chatid': getChatId
    }

    let command = message.body.split(' ')[0].replace('/', '');
    command=command.toLowerCase();
    console.log(listCommands)
    if (listCommands[command]) {
        return await listCommands[command].handler(client, message);
    }
    console.log(command)
}
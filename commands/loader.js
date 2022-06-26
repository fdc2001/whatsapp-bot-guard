const {userIsAdmin} = require("../utils");
const listCommands = {
    'admins':               require("./getAdminList"),
    'chatid':               require("./getChatId"),
    'link':                 require("./getLinkGroup"),
    'rules':                require("./getRules"),
    'help':                 require("./help"),
    'add':                  require('./addParticipant'),
    'open':                 require('./openGroup'),
    'close':                require('./closeGroup'),
    'alledit':              require('./allEditGroup'),
    'onlyadminedit':        require('./onlyAdminEditGroup'),
    //Config Groups
    'start':                require("./config/startConfig"),
    'changepermissions':    require("./config/changePermissions"),
    'create':    require("./config/create"),
}

exports.loader = async function loader (client,message) {
    let command = message.body.split(' ')[0].replace('/', '');

    command=command.toLowerCase();
    if (listCommands[command]) {
        const isGroup = message.isGroupMsg;

        let canUseCommand = true;
        if(listCommands[command].onlyGroup){
            canUseCommand = isGroup;
        }
        if(listCommands[command].onlyAdmin){
            if(await userIsAdmin(client, message, message.sender.id)){
                canUseCommand = true;
            }   else{
                return await client.sendReplyWithMentions(message.chatId, "Você não tem premissões para usar este comando.\nComando exclusivo para administradores", message.id);
            }
        }
        if(canUseCommand) {
            return await listCommands[command].handler(client, message);
        }
    }
}

exports.getCommands = function getCommands () {
    return listCommands;
}
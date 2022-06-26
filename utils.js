const loaderRules = require("./rules/loader");
const loader = require("./commands/loader");


async function iAmAdmin(client,message,host){
    const admin = await client.getGroupAdmins(message.chat.id);
    return admin.includes(host);
}
async function userIsAdmin(client,message,user){
    const admin = await client.getGroupAdmins(message.chat.id);
    return admin.includes(user);
}

function isValidURL(string) {
    const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}

function getGroupName(command, signature){
    let name =  command.replaceAll('/'+signature.name, '').trim();
    console.log(name)
    if (name.includes('[')) {
        const nameArr = name.match(/\[(.*?)\]/);
        name = name.replace(nameArr[0], '')
    }
    return name;
}


async function listPermissionsAvailable(){
    const commands = loader.getCommands();
    let messageText = 'Selecione da lista as premissões que deseja dar ao grupo: \nEstes são os comandos disponiveis: \n';
    for (const [, command] of Object.entries(commands)) {
        if(command.special){
            messageText += `*/${command.name}* - ${command.description} \n`;
        }
    }
    messageText+= '\nRegras: \n';
    const rules = loaderRules.getRules();
    for (const [, rule] of Object.entries(rules)) {
        messageText += `*${rule.name}* - ${rule.description} \n`;
    }
    return messageText;
}

async function listPermissionsAvailableArray(){
    const commands = loader.getCommands();
    let permissions = [];

    for (const [, command] of Object.entries(commands)) {
        if(command.special){
            permissions.push(command.name);
        }
    }

    const rules = loaderRules.getRules();
    for (const [, rule] of Object.entries(rules)) {
        permissions.push(rule.name);
    }
    return permissions;
}

exports.iAmAdmin = iAmAdmin;
exports.userIsAdmin = userIsAdmin;
exports.isValidURL = isValidURL;
exports.getGroupName = getGroupName;
exports.listPermissionsAvailableArray = listPermissionsAvailableArray;
exports.listPermissionsAvailable = listPermissionsAvailable;
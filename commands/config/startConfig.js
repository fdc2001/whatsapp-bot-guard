const {appName} = require("../../config");
const Group = require("../../model/Group");
const {getGroupName,listPermissionsAvailableArray,listPermissionsAvailable} = require('../../utils');

async function handler(client, message) {
    const isGroup = message.isGroupMsg;
    console.log(message.body);
    if(!isGroup){
        if(message.body ==='/'+signature.name){
            return await listGroupsAndSend(client, message);
        }else if(!(message.body.includes('[') && message.body.includes(']'))) {
            return await verifyGroupAndListPermissions(client, message);
        }else {
            return await registerGroup(client, message);
        }
    }else{
        return await client.sendText(message.chatId, appName+`Este comando apenas está disponivel no privado para configurações.`);
    }
}

async function listGroupsAndSend(client, message) {
    await client.sendText(message.chatId, appName+`A verificar os grupos.`);
    const groups = await client.getAllGroups();
    const availableGroups = [];
    for (const group of groups) {
        const admins = await client.getGroupAdmins(group.id);
        if(admins.includes(message.sender.id)){
            availableGroups.push(group);
        }
    }

    let messageText = `Os grupos disponiveis são: \n`;
    for (const group of availableGroups) {
        messageText += `*${group.contact.name}* \n ${group.contact.id} \n\n`;
    }
    messageText+= `\nEstes são os grupos em que você é administrador e que estou a participar. \npor favor envie o comando /${signature.name} e o nome do grupo`;
    return await client.sendText(message.chatId, messageText);
}

async function verifyGroupAndListPermissions(client, message) {
    const groupName = getGroupName(message.body, signature)
    const groupId = await getChatId(client, message, groupName);
    const admins = await client.getGroupAdmins(groupId);
    const duplicated = await Group.findOne({chatId: groupId}).exec();

    if(duplicated){
        return await client.sendText(message.chatId, appName+`O grupo já está registado. \nPara alterar as premissões utilize o comando /changePermissions.`);
    }

    if(typeof admins ==="string"){
        return await client.sendText(message.chatId, appName+`Ainda não estou no grupo indicado, por favor adicione-me e coloque-me como administrator.`);
    }
    if(admins.includes((await client.getHostNumber()).toString()+'@c.us')){
        const members = await client.getGroupMembers(groupId);
        await client.sendText(message.chatId, appName+`O grupo tem *`+(members.length-1)+`* participantes.`);
        await client.sendText(message.chatId, await listPermissionsAvailable());
        await client.sendText(message.chatId, "Para selecionar as permissões, envie o comando /"+signature.name+" e o nome do grupo e depois as permissões que deseja dar ao grupo entre parênteses retos. \nSegue exemplo:");
        await client.sendText(message.chatId, "/"+signature.name+" "+groupName+" ["+(await listPermissionsAvailableArray()).join(',')+"]");
    }else{
        return await client.sendText(message.chatId, appName+`Para continuar a configuração tem de me colocar como administrador do grupo.`);
    }
}


async function getChatId(client, message, groupName){
    let groupId = "";
    if(!groupName.includes('@c.us')){
        const groups = await client.getAllGroups();
        for (const group of groups) {
            if(group.contact.name.toLowerCase().replaceAll(' ', '')===groupName.toLowerCase().replaceAll(' ', '')){
                group.contact.name.toLowerCase().replaceAll(' ', '')
                groupId = group.contact.id;
            }
        }
    }else{
        groupId = groupName;
    }

    return groupId;
}

async function registerGroup(client, message){
    const groupName = getGroupName(message.body, signature);
    const groupId = await getChatId(client, message, groupName);
    const admins = await client.getGroupAdmins(groupId);

    if(admins.includes(message.sender.id)) {
        if (admins.includes((await client.getHostNumber()).toString() + '@c.us')) {
            let permissions = message.body.split('[')[1];
            permissions = permissions.split(']')[0].split(',');

            let permissionsValid = [];
            const permissionsAvailable = await listPermissionsAvailableArray();
            for (const permission of permissions) {
                if (permissionsAvailable.includes(permission)) {
                    permissionsValid.push(permission);
                }
            }
            if (permissionsValid.length === 0) {
                return await client.sendText(message.chatId, appName + `Não consegui reconhecer as permissões que indicou😖.`);
            } else {
                const duplicated = await Group.findOne({chatId: groupId}).exec();
                if (duplicated) {
                    return await client.sendText(message.chatId, appName + `O grupo já está registado. \nPara alterar as premissões utilize o comando /changePermissions.`);
                }
                const result = await Group.create({
                    chatId: groupId,
                    rules: permissionsValid,
                    createdBy: message.sender.id,
                });

                if (result) {
                    return await client.sendText(message.chatId, appName + `O grupo registado com sucesso, a partir de agora irei gerir o grupo👮🏻‍♀️.`);
                } else {
                    return await client.sendText(message.chatId, appName + `Ocorreu um erro ao registar o grupo.`);
                }
            }
        } else {
            return await client.sendText(message.chatId, appName + `Para continuar a configuração tem de me colocar como administrador do grupo.`);
        }
    }else {
        return await client.sendText(message.chatId, appName + `Tem de ser administrador do grupo para continuar a configuração.`);
    }
}



const signature={
    name: "start",
    special: false,
    onlyAdmin: false,
    onlyGroup: false,
    onlyPrivate: true,
    description: "Inicia a configuração do grupo",
    handler
}

module.exports = signature;
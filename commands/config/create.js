const {appName} = require("../../config");
const Group = require("../../model/Group");
const {getGroupName,listPermissionsAvailableArray,listPermissionsAvailable} = require('../../utils');

async function handler(client, message) {
    const isGroup = message.isGroupMsg;
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
    await client.sendText(message.chatId, appName+`Bem vindo ao assistente de criação de grupo.`);

    return await client.sendText(message.chatId, 'Para continuar envie o comando \n/'+signature.name+' e o nome do grupo que deseja criar.');
}

async function verifyGroupAndListPermissions(client, message) {
    const groupName = getGroupName(message.body, signature);
    await client.sendText(message.chatId, await listPermissionsAvailable());
    await client.sendText(message.chatId, "Para selecionar as permissões, envie o comando /"+signature.name+" e o nome do grupo e depois as permissões que deseja dar ao grupo entre parênteses retos. \nSegue exemplo:");
    await client.sendText(message.chatId, "/"+signature.name+" "+groupName+" ["+(await listPermissionsAvailableArray()).join(',')+"]");
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
    const groupName = getGroupName(message.body, signature).trim();


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
                const group = await client.createGroup(groupName, message.sender.id);
                await client.promoteParticipant(group.wid._serialized, message.sender.id);
                const result = await Group.create({
                    chatId: group.wid._serialized,
                    rules: permissionsValid,
                    createdBy: message.sender.id,
                });

                if (result) {
                    await client.sendText(message.chatId, appName + `Grupo criado com sucesso!`);
                    await client.sendText(message.chatId, appName + `Envio o link de partilha do grupo para que os usuários possam entrar no grupo.`);
                    await client.sendText(message.chatId, await client.getGroupInviteLink(group.wid._serialized));
                    await client.sendText(message.chatId, 'Por favor entre no grupo');
                    return await client.sendText(message.chatId, appName + `A partir de agora irei gerir o grupo👮🏻‍♀️ ao seu lado.`);
                } else {
                    return await client.sendText(message.chatId, appName + `Ocorreu um erro ao registar o grupo.`);
                }
            }
}



const signature={
    name: "create",
    special: false,
    onlyAdmin: false,
    onlyGroup: false,
    onlyPrivate: true,
    description: "Cria um grupo novo, já com o bot configurado para ajudar a gerir o grupo.",
    handler
}

module.exports = signature;
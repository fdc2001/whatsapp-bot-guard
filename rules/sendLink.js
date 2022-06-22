const utils = require("../utils");
const {appName} = require("../config");

async function handler(client, message) {
    console.log('sendLink')
    const adminList = await client.getGroupAdmins(message.chat.id);
    if(!adminList.includes(message.sender.id)){
        if (utils.isValidURL(message.body)) {
            const sharedLink = await client.getGroupInviteLink(message.chatId);

            const verification = message.body.split(sharedLink);
            if(verification.length<1){
                await client.removeParticipant(message.chat.id, message.sender.id);
                await client.reply(message.chatId, appName+`participante removido por enviar links.`, message.id, true);
            }
        }
    }
}

const signature={
    name: "sendLink",
    title:'Proibido enviar links',
    description: "Remove o participante se enviar links após 3 avisos",
    handler,
    permission:'sendLink',
    type:'rule'
}

module.exports = signature;
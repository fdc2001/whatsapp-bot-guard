const utils = require("../utils");
const {appName} = require("../config");
const Infraction = require("../model/Infraction");

async function handler(client, message) {
    const adminList = await client.getGroupAdmins(message.chat.id);
    if(!adminList.includes(message.sender.id)){
        if (utils.isValidURL(message.body)) {
            const sharedLink = await client.getGroupInviteLink(message.chatId);
            const verification = message.body.includes(sharedLink);
            if(!verification){
                let infractions = await Infraction.findOne({chatId: message.chatId, senderId: message.sender.id,rule: signature.name});

                if(!infractions){
                    infractions = Infraction.create({
                        chatId: message.chatId,
                        senderId: message.sender.id,
                        rule: signature.name,
                        count: 1
                    })
                    if(infractions){
                        await client.reply(message.chatId, appName+`*AVISO* \nÉ proibido o envio de links no grupo. \n*Este é o primeiro aviso!*.`, message.id, true);
                    }
                }else{
                    if(infractions.count < 3){
                        Infraction.findOne({chatId: message.chatId, senderId: message.sender.id,rule: signature.name}).updateOne({count: infractions.count+1}).exec();
                        infractions.count++;
                        infractions.save();
                        await client.reply(message.chatId, appName+`*AVISO* \nÉ proibido o envio de links no grupo. \n *Você tem ${infractions.count} avisos!*.`, message.id, true);
                    }else{
                        await client.removeParticipant(message.chat.id, message.sender.id);
                        await client.reply(message.chatId, appName+`participante removido por enviar links.`, message.id, true);
                        await Infraction.findOneAndDelete({chatId: message.chatId, senderId: message.sender.id,rule: signature.name}).exec();
                    }
                }

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
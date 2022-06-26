const {appName} = require("../config");
const Group = require('../model/Group');
async function handler(client) {
    const host = (await client.getHostNumber()).toString()+'@c.us'

    await client.onGlobalParticipantsChanged(async (participantChangedEvent) => {
        console.log(participantChangedEvent)

        if(participantChangedEvent.action === 'add'){
            if(participantChangedEvent.who!=host) {
                const details = await client.getGroupInfo(participantChangedEvent.chat);
                const config = await Group.findOne({chatId: participantChangedEvent.chat});
                if(config.createdBy === participantChangedEvent.who){
                    await client.promoteParticipant(participantChangedEvent.chat, participantChangedEvent.who);
                }else{
                    await client.sendTextWithMentions(participantChangedEvent.chat, appName + `Bem vindo @${participantChangedEvent.who} ao grupo!\nEstou aqui sempre disponivel para ajudar a manter o grupo em ordem.\nEnvio a informação presente na descrição do grupo:`);
                    if(details.description){
                        console.log(await client.sendText(participantChangedEvent.chat, details.description));
                    }
                }
            }
        }
        return true;
    });
}

module.exports = handler;
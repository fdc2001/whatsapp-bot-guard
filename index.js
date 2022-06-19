const wa = require('@open-wa/wa-automate');
const utils = require('./utils')
const commandsLoad = require("./commands/loader");

wa.create().then(client => start(client));

async function start(client) {
    await client.autoReject('I´m not available right now. Please try again later or never😂.');
    const host = (await client.getHostNumber()).toString()+'@c.us';

    //console.log(groupsManaged)


    await client.onMessage(async message => {
        console.log(message)

        if (message.body.startsWith('/')) {
            return await commandsLoad.loader(client, message)
        }
        if (message.isGroupMsg) {
            let iAmAdmin = await utils.iAmAdmin(client, message, host);
            if (iAmAdmin) {
                if (true) {
                    if (utils.isValidURL(message.body)) {
                        await client.removeParticipant(message.chat.id, message.sender.id);
                        await client.reply(message.chatId, `*BOT Guard* \n\nParticipante removido por enviar links.`, message.id, true);

                    }
                }
            }
        }


    });
}
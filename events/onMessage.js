const commandsLoad = require("../commands/loader");
const utils = require("../utils");
const rulesLoad = require("../rules/loader");


async function handler(client) {
    const host = (await client.getHostNumber()).toString()+'@c.us'
    await client.onMessage(async message => {
        if (message.body.startsWith('/')) {
            await commandsLoad.loader(client, message)
        }else{
            if (message.isGroupMsg) {
                let iAmAdmin = await utils.iAmAdmin(client, message, host);
                if (iAmAdmin) {
                    await rulesLoad.loader(client, message);
                }
            }
        }
        return await client.sendSeen(message.id)
    });
}

module.exports = handler;
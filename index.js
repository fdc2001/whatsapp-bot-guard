const wa = require('@open-wa/wa-automate');
const utils = require('./utils')
const commandsLoad = require("./commands/loader");
const rulesLoad = require("./rules/loader");

wa.create().then(client => start(client));

async function start(client) {
    await client.autoReject('I´m not available right now. Please try again later or never😂.');
    const host = (await client.getHostNumber()).toString()+'@c.us';

    await client.onMessage(async message => {

        if (message.body.startsWith('/')) {
            return await commandsLoad.loader(client, message)
        }
        if (message.isGroupMsg) {
            let iAmAdmin = await utils.iAmAdmin(client, message, host);
            if (iAmAdmin) {
                await rulesLoad.loader(client, message);
            }
        }


    });
}
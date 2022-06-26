const onMessage = require("./events/onMessage");
const onAddedToGroup = require("./events/onAddedToGroup");
const onGlobalParticipantsChanged = require("./events/onGlobalParticipantsChanged");

async function start(client) {
    await client.autoReject('I´m not available right now. Please try again later or never😂.');
    await client.setPresence(true);
    await client.setMyStatus('Para começar a usar os meus serviços envia /start\nDisponivel 24h/24h\n\nSou um bot criado por @fdc.dev (Ver instagram: @fdc.dev)');
    await onMessage(client);
    await onAddedToGroup(client);
    await onGlobalParticipantsChanged(client);
}

exports.start = start;
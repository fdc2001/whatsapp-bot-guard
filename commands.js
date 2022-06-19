exports.getChatId =async function (client,message,appName) {
    await client.sendText(message.chatId, `*${appName}* \n\nO id do chat é: ${message.chatId}`);
}
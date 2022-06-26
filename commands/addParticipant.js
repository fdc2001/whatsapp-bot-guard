const {appName} = require("../config");
const {getRulesEnabled} = require("../rules/loader");


async function handler(client, message) {
    const rulesEnabled = await getRulesEnabled(message);
    if(rulesEnabled.includes(signature.permission)) {
        const command =message.body.split(' ')
        if(command.length>1){
            const contact = command[1].replaceAll('+', '').replaceAll(' ', '')
            const verf = await client.checkNumberStatus(contact)
            if(verf.status===200){
                const link = await client.getGroupInviteLink(message.chatId)
                const detailsGroup = await client.getGroupInfo(message.chatId)

                await client.sendText(verf.id._serialized, appName+'Olá, foi convidado para entrar no grupo: *'+detailsGroup.title+'*\nClique no link para entrar no grupo\n'+link)
                await client.sendReplyWithMentions(message.chatId, `Foi enviado o link para o contacto indicado!`, message.id)
            }else{
                await client.sendReplyWithMentions(message.chatId, `Oops!, O contacto inserido não existe no whatsapp.`, message.id)
            }
        }else{
            await client.sendReplyWithMentions(message.chatId, `${appName}Oops!\n Falta indicar o participante a adicionar. \n Usa o comando /${signature.name} <numero ex: +${(await client.getHostNumber()).toString()}>`, message.id);
        }
        return true;
    }else{
        return await client.sendText(message.chatId, appName+`O comando envio não está habilitado, por favor fale com um administrador.`);
    }
}

const signature={
    name: "add",
    special: true,
    onlyGroup: true,
    onlyAdmin: false,
    onlyPrivate: false,
    description: "Comando para enviar o link do grupo diretamente ao contacto indicado",
    handler,
    permission:'add',
    type:'function'
}

module.exports = signature;
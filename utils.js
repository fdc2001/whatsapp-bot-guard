/**
 *
 * @param client
 * @returns {Promise<boolean>}
 */

async function iAmAdmin(client,message,host){
    const admin = await client.getGroupAdmins(message.chat.id);
    return admin.includes(host);

}

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

exports.iAmAdmin = iAmAdmin;
exports.isValidURL = isValidURL;
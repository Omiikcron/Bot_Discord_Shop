const tok = require('../../token');
let json = require('../../liste_item.json');

module.exports = {
    commands: ['have', 'doIHave', 'dh'],
    minArgs: '1',
    maxArgs: '2',
    expectedArgs: "<l'item> <le @ du gars>",
    callback: async (message, arguments, guildId, userId) => {
        const { guild, member } = message

        const Item = arguments[0]
        if (!json[Item]) {
            message.reply(`Ce n'est même pas un item qui existe ...`)
            return
        }

        const myTok = await tok.getToken(guild.id, member.id, json[Item].token)

        if (myTok == 0) {
            message.reply(`tu as vraiment cru avoir un/une ${Item} ?`)
            console.log("myTok", myTok)
            console.log(json[Item].token)
            return
        }

        const tokenOwned = await tok.getToken(guild.id, member.id, json[Item].token)
        console.log('tokenOwned', tokenOwned)
        message.reply(`Tu as ${tokenOwned} ${Item}!`)
        return
    }
}

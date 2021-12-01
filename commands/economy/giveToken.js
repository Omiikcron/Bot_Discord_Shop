const economy = require('../../economy');
const tok = require('../../token');
let json = require('../../liste_item.json');

module.exports = {
    commands: ['give','giveItem','g'],
    minArgs: '3',
    maxArgs: '3',
    expectedArgs: "<le @ du beneficiaire> <l'item> <la quantite>",
    callback: async (message, arguments, guildId, userId) => {
        const { guild, member } = message

        const target = message.mentions.users.first()
        if (!target) {
            message.reply('Donnes le blaze du gars que tu veux régaler.')
            return
        }

        const Item = arguments[1]
        if (!json[Item]) {
            message.reply('Donnes un item qui existe ...')
            return
        }

        const myTok = await tok.getToken(guild.id, member.id, json[Item].token)

        const tokenToGive = arguments[2]
        if (isNaN(tokenToGive)) {
            message.reply('Donne une quantité...')
            return
        }

        if (myTok == 0) {
            message.reply(`tu as vraiment cru avoir un/une ${Item} ?`)
            console.log("myTok", myTok)
            console.log(json[Item].token)
            return
        }

        if (tokenToGive < 1) {
            return message.reply('Tu va pas donner zero item crevard')
        }

        const tokenOwned = await tok.getToken(guild.id, member.id, json[Item].token)
        console.log('tokenOwned',tokenOwned)
        if (tokenOwned < tokenToGive) {
            message.reply(`Tu n'as que ${tokenOwned} ${Item}!`)
            return
        }

        const remainingToken = await tok.addToken(
            guild.id,
            member.id,
            json[Item].token,
            tokenToGive * -1
        )

        console.log("myTok", myTok)

        const newBalance = await tok.addToken(guild.id, target.id, json[Item].token, tokenToGive)
        console.log("newBalance", newBalance)

        message.reply(
            `tu as donne a <@${target.id}> ${tokenToGive} ${Item}! il a maintenant ${newBalance} ${Item} et tu as ${remainingToken} ${Item}!`
        )
    }
}
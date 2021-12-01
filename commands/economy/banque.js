const economy = require('../../economy')

module.exports = {
  commands: 'bank',
  minArgs: 2,
  maxArgs: 2,
  permissions: 'ADMINISTRATOR',
  expectedArgs: "<le @ du gars que tu veux payer> <le nombre d'hitacoin>",
  callback: async (message, arguments, text) => {
    const { guild, member } = message

    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Dis le blaze de gars que tu veux payer.')
      return
    }

    const coinsToGive = arguments[1]
    if (isNaN(coinsToGive)) {
      message.reply('Donne un chiffre...')
      return
    }

   

    const coinsOwned = await economy.getCoins(guild.id, member.id)
    if (coinsOwned < coinsToGive) {
      message.reply(`Tu n'as que ${coinsOwned} hitacoin!`)
      return
    }

    const remainingCoins = await economy.addCoins(
      guild.id,
      member.id,
      coinsToGive * -1
    )
    const newBalance = await economy.addCoins(guild.id, target.id, coinsToGive)
    message.reply(
      `tu as donner à <@${target.id}> ${coinsToGive} hitacoins! il a maintenant ${newBalance} hitacoins et tu as ${remainingCoins} hitacoins!`
    )
  },
}
const economy = require('../../economy');




function random(min, max){
    min = Math.ceil(0);
    max = Math.floor(1000);
    randnum = Math.floor(Math.random() * (max - min +1)+ min);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    commands: 'vol',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<le @ du mec que tu veux voler>",
    callback: async (message) => {
        const { guild, member } = message
        const target = message.mentions.users.first()
     
     
        if (!target) {
            message.reply('Dis moi le blaze du mec que tu veux voler !')
            return
        }

        const coinsOwneds = await economy.getCoins(guild.id, member.id)

        if (coinsOwneds < 5) {
            message.reply(`Tu n'as que ${coinsOwneds} Hc, avec ça tu ne peux pas organiser de braquage !`)
            return
        }

        const coinsToGive = await economy.getCoins(guild.id, target.id)
        if (coinsToGive < 5){
            message.reply(`T'es sérieux tu vas vraiment essayer de voler un pauvre ?`)
            return
        }
        
        if (target.id === '809498433017741333') {
        message.reply(`Tu touches pas à KissShot !`)
        return
        }
        

        random()
        const prix = 5
        if (randnum !== 666) {
            message.reply(`ton vol est un pur échec tu as juste perdu 5 Hc! ${randnum}`)
            console.log('perdu on rajoute les sous à la victime')
            await economy.addCoins(
                guild.id,
                member.id,
                prix * -1
            )
            console.log('Reussi, on ajoute les sous au compte')
            sleep(150)
            economy.addCoins(guild.id, target.id, prix)
            return
        }
 


        console.log('Ganger on retire les sous du compte')
        const succesvol = await economy.addCoins(
            guild.id,
            target.id,
            coinsToGive * -1
        )
        console.log('Reussi, on ajoute les sous au compte')
       sleep(150)
        const newBalance = await economy.addCoins(guild.id, member.id, coinsToGive)
        console.log('tout ok')
        message.reply(`Bravo ton vol sur ${target} est un succès tu lui as volé ${coinsToGive} Hc, tu as maintenant ${newBalance} Hc et lui il n'a plus que ${succesvol}`)






    },
}


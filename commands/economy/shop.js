const economy = require('../../economy');
const tok = require('../../token');
let json = require('../../liste_item.json');

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


module.exports = {
    commands: 'buy',
    minArgs: '1',
    maxArgs: '2',
    callback: async (message, arguments) => {
        const { guild, member } = message

        const Item = arguments[0]
        if (!json[Item]) {
            message.reply('Demande un item qui existe ...')
            return
        }

        const jstoken = json[Item].token

        const tokenToBuy = arguments[1] || 1

        sleep(100);

        const prix = json[Item].price * tokenToBuy
        console.log("ttt",prix);

        sleep(500);

        const coinsOwned = await economy.getCoins(guild.id, member.id)
        if (coinsOwned < prix) {
            message.reply(`Tu n'as que ${coinsOwned} hitacoin alors qu'il t'en faut ${prix} !`)
            return
        }

        sleep(100);

        await economy.addCoins( //remove l'argent
            guild.id,
            member.id,
            prix * -1 * tokenToBuy
        )

        message.reply(`tu viens de buy ${tokenToBuy} ${Item} pour la maudique somme de ${prix} hc`)

        await economy.addCoins( //pay kissshot
            guild.id,
            "878339976658550794",
            prix*tokenToBuy*0.7)

        sleep(100);

        await economy.addCoins( //pay omiikcron
            guild.id,
            "124165813392375810",
            prix*tokenToBuy*0.3)

        sleep(100);

        await tok.addToken(
            guild.id,
            member.id,
            jstoken,
            tokenToBuy,
            console.log("tokenToBuy",tokenToBuy)
        )
    }
}

	//SI ADD ITEM --> add dans schema et dans index (pour le embeded)
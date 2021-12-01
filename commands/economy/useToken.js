const economy = require('../../economy');
const roleArray = require('../../roleArray');
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
    commands: ['use','useItem','u'],
    minArgs: '1',
    maxArgs: '3',
    callback: async (message, arguments) =>
    {
        const { guild, member } = message

        const Item = arguments[0]
        if (!json[Item]) {
            message.reply('Demande un item qui existe ...')
            return
        }

        const target = message.mentions.users.first();

        const myTok = await tok.getToken(guild.id, member.id, json[Item].token)

        if (myTok == 0)
        {
            message.reply('Tu en à même pas enculé ...')
            console.log("myTok", myTok)
            console.log(json[Item].token)
            return
        }

        sleep(300);

        var quantite = 1

        if (arguments[2] != null || Item == "Spam" && arguments[2] != null) {
            quantite = arguments[2];
        }

        if (quantite < 1) {
            message.reply(`t'a vraiment voulu me la mettre à l'envers pd ?`);
            return
        }

        if (myTok < quantite) {
            message.reply('Tu en à pas assez, revoies la quantité à la baisse !')
            console.log("myTok", myTok)
            console.log(json[Item].token)
            return
        }

        sleep(300);

        const remainingToken = await tok.addToken(
            guild.id,
            member.id,
            json[Item].token,
            quantite * -1
        )

        sleep(300);

        if (Item == "NissanGTR") {
            message.reply(":red_car: vroum vroum les fils de pute")
        }

        if (Item == "Spam") {
            for (let i = 0; i < 10*quantite; i++) {
                target.send(`Get spammed by <@${member.id}>`)
            }
            message.reply(":red_car: vroum vroum les fils de pute")
        }

        if (Item == "NumberONE") { //commande des enfers insh
            const ancienUnique = await roleArray.getUnique("NumberONE")

            sleep(300);

            roleNbO = await message.guild.roles.cache.find(role => role.name === `L'unique`);
            if (ancienUnique != null)
            {
                const oldMember = await guild.members.fetch(ancienUnique); //obligé de faire ca pour coller l'id plus bas à un user
                await roleArray.delRole(ancienUnique, "NumberONE");
                await oldMember.roles.remove(roleNbO.id);
            }
            await roleArray.addRole(member.id, "NumberONE");
            await member.roles.add(roleNbO.id);
            message.reply("tu viens de te hisser au sommet !")
        }

        if (Item == "DreamTeam")
        {
            if (member.roles.cache.some(r => r.name === "DreamTeam"))
            {
                message.reply("Tu fais déjà partie de la team .. ca ne te suffit pas ?")
                return
            }
            else
            {
                let role = message.guild.roles.cache.find(role => role.name === "DreamTeam");
                roleArray.addRole(member.id, "DreamTeam")
                member.roles.add(role)
                message.reply(`Félicitation, tu t'élèves au dessus des loser et entre dans la <@&${"871086570558619654"}>`)
            }
        }

        if (Item == "Mute") {
            if (!target) { //les bots n'ont pas de User donc on check ici si le target.users existe ou non
                await message.channel.send('tocard, tu a essayé de mute un dieu, prends donc le retour de bâton');
                await message.channel.send(`!muting <@${member.id}> ${quantite}`);
            }
            else {
                await message.channel.send(`!muting <@${target.id}> ${quantite}`);
            }
        }

        message.reply(`Tu viens d'utiliser ${quantite} ${Item}, il t'en reste désormais ${remainingToken}`)
    }
}

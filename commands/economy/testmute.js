const roleArray = require('../../roleArray');

module.exports = {
    commands: 'muting',
    minArgs: '2',
    maxArgs: '2',
    permissions: 'ADMINISTRATOR',
    callback: async (message, argument) => {

        const { guild, member } = message

        const target = message.mentions.users.first() //le @du gars a mute

        const nbToken = argument[1]
        const duration = 30000*nbToken
        const seconds = duration/1000

        if (target) {

            let mainRole1 = message.guild.roles.cache.find(role => role.name === 'membre');
            let mainRole2 = message.guild.roles.cache.find(role => role.name === 'DreamTeam');
            let mainRole3 = message.guild.roles.cache.find(role => role.name === 'ZZZElu');
            let mainRole4 = message.guild.roles.cache.find(role => role.name === `L'unique`);

            let muteRole = message.guild.roles.cache.find(role => role.name === 'GOUGOU');

            var haveRole1 = new Boolean(false);
            var haveRole2 = new Boolean(false);
            var haveRole3 = new Boolean(false);
            var haveRole4 = new Boolean(false);

            let memberTarget = message.guild.members.cache.get(target.id);

            if (await roleArray.getRole(target.id, 'membre') == true) { message.reply("a le role membre"); haveRole1 = true ; await memberTarget.roles.remove(mainRole1.id); }
            if (await roleArray.getRole(target.id, 'DreamTeam') == true) { message.reply("a le role DreamTeam"); haveRole2 = true ; await memberTarget.roles.remove(mainRole2.id); }
            if (await roleArray.getRole(target.id, 'ZZZElu') == true) { message.reply("a le role dt"); haveRole3 = true ; await memberTarget.roles.remove(mainRole3.id); }
            if (await roleArray.getRole(target.id, `L'unique`) == true) { message.reply("a le role dt"); haveRole4 = true ; await memberTarget.roles.remove(mainRole4.id); }

            await memberTarget.roles.add(muteRole.id);
            await roleArray.addRole(target.id, 'GOUGOU');

            message.channel.send(`<@${memberTarget.user.id}> à été mute pour ${seconds} secondes`);

            console.log("duration", duration);
            setTimeout(() => {
                memberTarget.roles.remove(muteRole.id);
                if (haveRole1 == true) { memberTarget.roles.add(mainRole1.id) }
                if (haveRole2 == true) { memberTarget.roles.add(mainRole2.id) }
                if (haveRole3 == true) { memberTarget.roles.add(mainRole3.id) }
                if (haveRole4 == true) { memberTarget.roles.add(mainRole4.id) }
                roleArray.delRole(target.id, 'GOUGOU');
            }, duration);

        }
    }
}

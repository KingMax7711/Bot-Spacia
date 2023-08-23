const Discord = require("discord.js");
const loadSlashCommands = require("../Handlers/loadSlashCommands");

module.exports = async bot => {
    await loadSlashCommands(bot);

    console.log(`${bot.user.tag} est bien en ligne !`);
};

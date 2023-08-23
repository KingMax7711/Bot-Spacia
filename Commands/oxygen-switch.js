const Discord = require("discord.js");
const { oxygenService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const OxygenColor = colors.oxygen;
const AllowedChannels = require("../Config/channel_systems");
const OxygenSwitchChannel = [AllowedChannels.channels.oxygen];

// Importations des dépendances
const { electricityService } = require("../Systems/Relation");

module.exports = {
    name: "oxygen-switch",
    description: "Alterne l'intérupteur de l'Oxygène",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = oxygenService.getSnapshot().value;
        const nextState = currentState === "On" ? "Off" : "On";

        if (!OxygenSwitchChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        if (nextState === "On" && electricityService.getSnapshot().value === "Off") {
            const embed = new Discord.EmbedBuilder()
                .setColor(OxygenColor)
                .setTitle("Oxygène :")
                .setDescription(`Statut : **ERROR**`)
                .setThumbnail(
                    "https://media.discordapp.net/attachments/1138110011625709608/1138150677399470270/image.png?width=580&height=580",
                );
            return message.reply({ embeds: [embed] });
        }

        // Envoie l'événement approprié pour alterner le statut du système d'oxygène
        oxygenService.send(`TURN_${nextState.toUpperCase()}`);

        await message.reply(
            `Le système d'oxygène est maintenant sur: \`${nextState.toUpperCase()}\``,
        );
    },
};

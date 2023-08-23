const Discord = require("discord.js");
const { waterService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const WaterColor = colors.water;
const AllowedChannels = require("../Config/channel_systems");
const WaterSwitchChannel = [AllowedChannels.channels.water];

// Importations des dépendances
const { electricityService } = require("../Systems/Relation");

module.exports = {
    name: "water-switch",
    description: "Alterne l'intérupteur du système d'eau",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = waterService.getSnapshot().value;
        const nextState = currentState === "On" ? "Off" : "On";

        if (!WaterSwitchChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        if (nextState === "On" && electricityService.getSnapshot().value === "Off") {
            const embed = new Discord.EmbedBuilder()
                .setColor(WaterColor)
                .setTitle("Water :")
                .setDescription(`Statut : **ERROR**`)
                .setThumbnail(
                    "https://media.discordapp.net/attachments/1138110011625709608/1138797536732266608/image.png?width=580&height=580",
                );
            return message.reply({ embeds: [embed] });
        }

        // Envoie l'événement approprié pour alterner le statut du système d'eau
        waterService.send(`TURN_${nextState.toUpperCase()}`);

        await message.reply(
            `Le système d'eau est maintenant sur: \`${nextState.toUpperCase()}\``,
        );
    },
};

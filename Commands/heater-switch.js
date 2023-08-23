const Discord = require("discord.js");
const { heatService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const HeatColor = colors.heat;
const AllowedChannels = require("../Config/channel_systems");
const HeatSwitchChannel = [AllowedChannels.channels.heat];

// Importations des dépendances
const { electricityService } = require("../Systems/Relation");
const { oxygenService } = require("../Systems/Relation");
const { waterService } = require("../Systems/Relation");

module.exports = {
    name: "heater-switch",
    description: "Alterne l'intérupteur de la régulation thermique",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = heatService.getSnapshot().value;
        const nextState = currentState === "On" ? "Off" : "On";

        if (!HeatSwitchChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        if (
            (nextState === "On" && electricityService.getSnapshot().value === "Off") ||
            (nextState === "On" &&
                electricityService.getSnapshot().value === "Emergency") ||
            (nextState === "On" && oxygenService.getSnapshot().value === "Off") ||
            (nextState === "On" && waterService.getSnapshot().value === "Off")
        ) {
            const embed = new Discord.EmbedBuilder()
                .setColor(HeatColor)
                .setTitle("Heater :")
                .setDescription(`Statut : **ERROR**`)
                .setThumbnail(
                    "https://media.discordapp.net/attachments/1138110011625709608/1138150677399470270/image.png?width=580&height=580",
                );
            return message.reply({ embeds: [embed] });
        }

        // Envoie l'événement approprié pour alterner le statut du système d'oxygène
        heatService.send(`TURN_${nextState.toUpperCase()}`);

        await message.reply(
            `Le système de régulation thermique est maintenant sur: \`${nextState.toUpperCase()}\``,
        );
    },
};

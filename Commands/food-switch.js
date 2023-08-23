const Discord = require("discord.js");
const { eatService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const eatColor = colors.food;
const AllowedChannels = require("../Config/channel_systems");
const eatSwitchChannel = [AllowedChannels.channels.food];

// Importations des dépendances
const { electricityService } = require("../Systems/Relation");

module.exports = {
    name: "food-switch",
    description: "Alterne l'intérupteur de la nouriture",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = eatService.getSnapshot().value;
        const nextState = currentState === "On" ? "Off" : "On";

        if (!eatSwitchChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        if (
            (nextState === "On" && electricityService.getSnapshot().value === "Off") ||
            (nextState === "On" && electricityService.getSnapshot().value === "Emergency")
        ) {
            const embed = new Discord.EmbedBuilder()
                .setColor(eatColor)
                .setTitle("Nouriture :")
                .setDescription(`Statut : **ERROR**`)
                .setThumbnail(
                    "https://media.discordapp.net/attachments/1138110011625709608/1138150677399470270/image.png?width=580&height=580",
                );
            return message.reply({ embeds: [embed] });
        }

        // Envoie l'événement approprié pour alterner le statut du système d'oxygène
        eatService.send(`TURN_${nextState.toUpperCase()}`);

        await message.reply(
            `Le système de nouriture est maintenant sur: \`${nextState.toUpperCase()}\``,
        );
    },
};

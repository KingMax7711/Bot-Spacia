const Discord = require("discord.js");
const { propulsionService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const propulsionColor = colors.propulsion;
const AllowedChannels = require("../Config/channel_systems");
const PropulsionSwitchChannel = [
    AllowedChannels.channels.propulsion,
    AllowedChannels.channels.control,
];

// Importations des dépendances
const { gridService } = require("../Systems/Relation");

module.exports = {
    name: "propulsion-switch",
    description: "Alterne l'intérupteur de la propulsion",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = propulsionService.getSnapshot().value;
        const nextState = currentState === "On" ? "Off" : "On";

        if (!PropulsionSwitchChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        if (
            (nextState === "On" && gridService.getSnapshot().value === "OFF") ||
            (nextState === "On" && gridService.getSnapshot().value === "Emergency")
        ) {
            const embed = new Discord.EmbedBuilder()
                .setColor(propulsionColor)
                .setTitle("Propulsion :")
                .setDescription(`Statut : **ERROR**`)
                .setThumbnail(
                    "https://media.discordapp.net/attachments/1138110011625709608/1138150677399470270/image.png?width=580&height=580",
                );
            return message.reply({ embeds: [embed] });
        }

        // Envoie l'événement approprié pour alterner le statut du système d'oxygène
        propulsionService.send(`TURN_${nextState.toUpperCase()}`);

        await message.reply(
            `Le système de propulsion est maintenant sur: \`${nextState.toUpperCase()}\``,
        );
    },
};

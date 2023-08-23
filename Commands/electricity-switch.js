const Discord = require("discord.js");
const { electricityService } = require("../Systems/Relation");
const { gridService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const ElectricityColor = colors.electricity;
const AllowedChannels = require("../Config/channel_systems");
const ElectricitySwitchChannel = [AllowedChannels.channels.electricity];

module.exports = {
    name: "electricity-switch",
    description: "Alterne l'intérupteur de l'Electricité",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = electricityService.getSnapshot().value;
        const nextState = currentState === "On" ? "Off" : "On";

        if (!ElectricitySwitchChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        if (gridService.getSnapshot().value === "Emergency") {
            electricityService.send(`TURN_EMERGENCY`);

            return await message.reply(
                `Le système électrique est bloqué pour des raisons de sécurité sur: \`EMERGENCY\``,
            );
        }
        if (gridService.getSnapshot().value === "OFF") {
            electricityService.send(`TURN_OFF`);

            const embed = new Discord.EmbedBuilder()
                .setColor(ElectricityColor)
                .setTitle("Electricité :")
                .setDescription(`Statut : **ERROR**`)
                .setThumbnail(
                    "https://media.discordapp.net/attachments/1138110011625709608/1138150677399470270/image.png?width=580&height=580",
                );
            return message.reply({ embeds: [embed] });
        }

        // Envoie l'événement approprié pour alterner le statut du système électrique
        electricityService.send(`TURN_${nextState.toUpperCase()}`);

        await message.reply(
            `Le système électrique est maintenant sur: \`${nextState.toUpperCase()}\``,
        );
    },
};

const Discord = require("discord.js");
const { heatService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const HeatColor = colors.heat;
const AllowedChannels = require("../Config/channel_systems");
const HeatStatusChannel = [
    AllowedChannels.channels.heat,
    AllowedChannels.channels.control,
];

module.exports = {
    name: "heater-status",
    description: "Affiche le statut de la régulation thermique",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = heatService.getSnapshot().value;
        const embed = new Discord.EmbedBuilder()
            .setColor(HeatColor)
            .setTitle("Heater :")
            .setDescription(`Statut : **${currentState.toUpperCase()}**`)
            .setThumbnail(
                "https://media.discordapp.net/attachments/1138110011625709608/1139122743401517129/image.png?width=580&height=580",
            );

        if (!HeatStatusChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        await message.reply({ embeds: [embed] });
    },
};

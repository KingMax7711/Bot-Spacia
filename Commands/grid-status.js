const Discord = require("discord.js");
const { gridService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const gridColor = colors.grid;
const AllowedChannels = require("../Config/channel_systems");
const GridStatusChannel = [
    AllowedChannels.channels.grid,
    AllowedChannels.channels.control,
];

module.exports = {
    name: "grid-status",
    description: "Affiche le statut du réseaux electrique",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        let currentState = "";
        if (gridService.getSnapshot().value === "Primary") {
            currentState = "Système Primaire";
        } else if (gridService.getSnapshot().value === "Emergency") {
            currentState = "Système de Secours";
        } else {
            currentState = "Off";
        }
        const embed = new Discord.EmbedBuilder()
            .setColor(gridColor)
            .setTitle("Réseaux :")
            .setDescription(`Statut : **${currentState.toUpperCase()}**`)
            .setThumbnail(
                "https://media.discordapp.net/attachments/1138110011625709608/1138556647179034674/image.png?width=580&height=580",
            );

        if (!GridStatusChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        await message.reply({ embeds: [embed] });
    },
};

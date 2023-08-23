const Discord = require("discord.js");
const { waterService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const WaterColor = colors.water;
const AllowedChannels = require("../Config/channel_systems");
const waterStatusChannel = [
    AllowedChannels.channels.water,
    AllowedChannels.channels.control,
];

module.exports = {
    name: "water-status",
    description: "Affiche le statut du système d'eau",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = waterService.getSnapshot().value;
        const embed = new Discord.EmbedBuilder()
            .setColor(WaterColor)
            .setTitle("Water :")
            .setDescription(`Statut : **${currentState.toUpperCase()}**`)
            .setThumbnail(
                "https://media.discordapp.net/attachments/1138110011625709608/1138797536732266608/image.png?width=580&height=580",
            );

        if (!waterStatusChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        await message.reply({ embeds: [embed] });
    },
};

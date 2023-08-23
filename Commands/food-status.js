const Discord = require("discord.js");
const { eatService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const eatColor = colors.food;
const AllowedChannels = require("../Config/channel_systems");
const eatStatusChannel = [
    AllowedChannels.channels.food,
    AllowedChannels.channels.control,
];

module.exports = {
    name: "food-status",
    description: "Affiche le statut de la nouriture",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = eatService.getSnapshot().value;
        const embed = new Discord.EmbedBuilder()
            .setColor(eatColor)
            .setTitle("Nouriture :")
            .setDescription(`Statut : **${currentState.toUpperCase()}**`)
            .setThumbnail(
                "https://media.discordapp.net/attachments/1138110011625709608/1138879505763667998/image.png?width=580&height=580",
            );

        if (!eatStatusChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        await message.reply({ embeds: [embed] });
    },
};

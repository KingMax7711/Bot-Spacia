const Discord = require("discord.js");
const { electricityService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const ElectricityColor = colors.electricity;
const AllowedChannels = require("../Config/channel_systems");
const ElectricityStatusChannel = [
    AllowedChannels.channels.electricity,
    AllowedChannels.channels.control,
];

module.exports = {
    name: "electricity-status",
    description: "Affiche le statut de l'Electricité",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = electricityService.getSnapshot().value;
        const embed = new Discord.EmbedBuilder()
            .setColor(ElectricityColor)
            .setTitle("Electricité :")
            .setDescription(`Statut : **${currentState.toUpperCase()}**`)
            .setThumbnail(
                "https://media.discordapp.net/attachments/1138110011625709608/1138112360498872461/image.png?width=580&height=580",
            );

        if (!ElectricityStatusChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        await message.reply({ embeds: [embed] });
    },
};

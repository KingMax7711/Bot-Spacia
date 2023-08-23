const Discord = require("discord.js");
const { oxygenService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const OxygenColor = colors.oxygen;
const AllowedChannels = require("../Config/channel_systems");
const OxygenStatusChannel = [
    AllowedChannels.channels.oxygen,
    AllowedChannels.channels.control,
];

module.exports = {
    name: "oxygen-status",
    description: "Affiche le statut de l'Oxygène",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = oxygenService.getSnapshot().value;
        const embed = new Discord.EmbedBuilder()
            .setColor(OxygenColor)
            .setTitle("Oxygène :")
            .setDescription(`Statut : **${currentState.toUpperCase()}**`)
            .setThumbnail(
                "https://media.discordapp.net/attachments/1138110011625709608/1138129112259641484/image.png?width=580&height=580",
            );

        if (!OxygenStatusChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        await message.reply({ embeds: [embed] });
    },
};

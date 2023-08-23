const Discord = require("discord.js");
const { propulsionService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const propulsionColor = colors.propulsion;
const AllowedChannels = require("../Config/channel_systems");
const PropulsionStatusChannel = [
    AllowedChannels.channels.propulsion,
    AllowedChannels.channels.control,
];

module.exports = {
    name: "propulsion-status",
    description: "Affiche le statut de la propulsion",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = propulsionService.getSnapshot().value;
        const embed = new Discord.EmbedBuilder()
            .setColor(propulsionColor)
            .setTitle("Propulsion :")
            .setDescription(`Statut : **${currentState.toUpperCase()}**`)
            .setThumbnail(
                "https://media.discordapp.net/attachments/1138110011625709608/1138884884375543899/image.png?width=580&height=580",
            );

        if (!PropulsionStatusChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        await message.reply({ embeds: [embed] });
    },
};

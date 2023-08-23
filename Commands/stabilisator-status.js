const Discord = require("discord.js");
const { stabilisateurService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const stabilisateurColor = colors.emergency_stab;
const AllowedChannels = require("../Config/channel_systems");
const StabilisatorStatusChannel = [
    AllowedChannels.channels.emergency_stab,
    AllowedChannels.channels.control,
];

module.exports = {
    name: "stabilisator-status",
    description: "Affiche le statut des stabilisateurs d'urgence",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = stabilisateurService.getSnapshot().value;
        const embed = new Discord.EmbedBuilder()
            .setColor(stabilisateurColor)
            .setTitle("Stabilisateur d'Urgence :")
            .setDescription(`Statut : **${currentState.toUpperCase()}**`)
            .setThumbnail(
                "https://media.discordapp.net/attachments/1138110011625709608/1138894757523890268/image.png?width=580&height=580",
            );

        if (!StabilisatorStatusChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        await message.reply({ embeds: [embed] });
    },
};

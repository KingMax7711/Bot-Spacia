const Discord = require("discord.js");
const { stabilisateurService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const stabilisateurColor = colors.emergency_stab;
const AllowedChannels = require("../Config/channel_systems");
const StabilisatorSwitchChannel = [
    AllowedChannels.channels.emergency_stab,
    AllowedChannels.channels.control,
];

// Importations des dépendances
const { gridService } = require("../Systems/Relation");

module.exports = {
    name: "stabilisator-switch",
    description: "Alterne l'intérupteur des stabilisateurs d'Urgence",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const currentState = stabilisateurService.getSnapshot().value;
        const nextState = currentState === "On" ? "Off" : "On";

        if (!StabilisatorSwitchChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        if (nextState === "On" && gridService.getSnapshot().value === "OFF") {
            const embed = new Discord.EmbedBuilder()
                .setColor(stabilisateurColor)
                .setTitle("Stabilisateur D'urgence :")
                .setDescription(`Statut : **ERROR**`)
                .setThumbnail(
                    "https://media.discordapp.net/attachments/1138110011625709608/1138150677399470270/image.png?width=580&height=580",
                );
            return message.reply({ embeds: [embed] });
        }

        // Envoie l'événement approprié pour alterner le statut du système d'oxygène
        stabilisateurService.send(`TURN_${nextState.toUpperCase()}`);

        await message.reply(
            `Le système de stabilisation d'urgence est maintenant sur: \`${nextState.toUpperCase()}\``,
        );
    },
};

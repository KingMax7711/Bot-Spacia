const Discord = require("discord.js");
const Services = require("../Systems/Relation");
const { colors } = require("../Config/color");
const controlColor = colors.control;
const AllowedChannels = require("../Config/channel_systems");
const StatusChannel = [AllowedChannels.channels.control];

module.exports = {
    name: "status",
    description: "Affiche le statut de tout les systèmes",
    permission: "Aucune",
    dm: false,
    category: "RP",

    async run(bot, message, args) {
        const embed = new Discord.EmbedBuilder()
            .setColor(controlColor)
            .setTitle("Statut de tout les systèmes :")
            .setThumbnail(
                "https://media.discordapp.net/attachments/1138110011625709608/1138815656788234380/image.png?width=580&height=580",
            )
            .addFields(
                {
                    name: "Générateur:",
                    value: `Statut: \`${Services.gridService.getSnapshot().value}\``,
                },
                {
                    name: "Réseaux Electrique :",
                    value: `Statut: \`${
                        Services.electricityService.getSnapshot().value
                    }\``,
                },
                {
                    name: "Réseaux D'Eau :",
                    value: `Statut: \`${Services.waterService.getSnapshot().value}\``,
                },
                {
                    name: "Réseaux D'Oxigène :",
                    value: `Statut: \`${Services.oxygenService.getSnapshot().value}\``,
                },
                {
                    name: "Réseaux De Nouriture :",
                    value: `Statut: \`${Services.eatService.getSnapshot().value}\``,
                },
                {
                    name: "Réseaux De Propulsion :",
                    value: `Statut: \`${
                        Services.propulsionService.getSnapshot().value
                    }\``,
                },
                {
                    name: "Système De régulation thermique :",
                    value: `Statut: \`${Services.heatService.getSnapshot().value}\``,
                },
                {
                    name: "Système De Stabilisation d'Urgence :",
                    value: `Statut: \`${
                        Services.stabilisateurService.getSnapshot().value
                    }\``,
                },
            );

        if (!StatusChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        await message.reply({ embeds: [embed] });
    },
};

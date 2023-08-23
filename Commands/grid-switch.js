const Discord = require("discord.js");
const { gridService } = require("../Systems/Relation");
const { colors } = require("../Config/color");
const GridColor = colors.grid;
const AllowedChannels = require("../Config/channel_systems");
const GridSwitchChannel = [AllowedChannels.channels.grid];

module.exports = {
    name: "grid-switch",
    description: "Selection du Réseaux de la station",
    permission: "Aucune",
    dm: true,
    category: "RP",

    options: [
        {
            type: "string",
            name: "reseaux",
            description: "Le Réseaux sur le quel basculer",
            required: true,
            autocomplete: true,
            choices: [
                {
                    name: "Primary",
                    value: "PRIMARY_ON",
                },
                {
                    name: "Emergency",
                    value: "EMERGENCY_ON",
                },
                {
                    name: "OFF",
                    value: "TURN_OFF",
                },
            ],
        },
    ],

    async run(bot, message, args) {
        const currentState = gridService.getSnapshot().value;
        let reseaux = "";
        if (message.options.getString("reseaux") === "Primary") {
            reseaux = "PRIMARY_ON";
        } else if (message.options.getString("reseaux") === "Emergency") {
            reseaux = "EMERGENCY_ON";
        } else {
            reseaux = "TURN_OFF";
        }

        if (!GridSwitchChannel.includes(message.channel.id))
            return message.reply("Cette commande ne peut être éxécuté içi");

        if (currentState === message.options.getString("reseaux")) {
            let ReadableCurrentState = "";
            if (gridService.getSnapshot().value === "Primary") {
                ReadableCurrentState = "Système Primaire";
            } else if (gridService.getSnapshot().value === "Emergency") {
                ReadableCurrentState = "Système de Secours";
            } else {
                ReadableCurrentState = "Off";
            }

            const embed = new Discord.EmbedBuilder()
                .setColor(GridColor)
                .setTitle("Grid :")
                .setDescription(
                    `Statut : **ERROR** \n *Le réseaux est déja configuré sur \`${ReadableCurrentState}\`*`,
                )
                .setThumbnail(
                    "https://media.discordapp.net/attachments/1138110011625709608/1138150677399470270/image.png?width=580&height=580",
                );
            return message.reply({ embeds: [embed] });
        }

        gridService.send(reseaux);

        let ReadableCurrentState = "";
        if (gridService.getSnapshot().value === "Primary") {
            ReadableCurrentState = "Système Primaire";
        } else if (gridService.getSnapshot().value === "Emergency") {
            ReadableCurrentState = "Système de Secours";
        } else {
            ReadableCurrentState = "Off";
        }

        await message.reply(
            `Le réseaux électrique est maintenant sur: \`${ReadableCurrentState}\``,
        );
    },
};

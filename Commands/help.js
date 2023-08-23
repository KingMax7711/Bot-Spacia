const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Affiche la liste des commandes disponible",
    permission: "Aucune",
    dm: true,
    category: "Assistance",

    options: [
        {
            type: "string",
            name: "commande",
            description: "La commande a afficher",
            required: false,
            autocomplete: true,
        },
    ],

    async run(bot, message, args) {
        let command;
        if (args.getString("commande")) {
            command = bot.commands.get(args.getString("commande"));
            if (!command) return message.reply("Commande inconnue");
        }

        if (!command) {
            let categories = [];
            bot.commands.forEach((command) => {
                if (!categories.includes(command.category))
                    categories.push(command.category);
            });

            let Embed = new Discord.EmbedBuilder()
                .setColor("#FFCD29")
                .setTitle(`Commandes du BOT`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setDescription(
                    `Commandes Disponibles: \`${bot.commands.size}\` \nCatégorie Disponibles : \`${categories.length}\``,
                )
                .setTimestamp()
                .setFooter({ text: "Commande du Robot" });

            await categories.sort().forEach(async (cat) => {
                let commands = bot.commands.filter((cmd) => cmd.category === cat);
                Embed.addFields({
                    name: `${cat}`,
                    value: `${commands
                        .map((cmd) => `\`${cmd.name}\` : ${cmd.description}`)
                        .join("\n")}`,
                });
            });

            await message.reply({ embeds: [Embed] });
        } else {
            let Embed = new Discord.EmbedBuilder()
                .setColor("#FFCD29")
                .setTitle(`Commandes: \`${command.name}\``)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setDescription(
                    `Nom: \`${command.name}\`\nDescription: \`${
                        command.description
                    }\`\nPermissions Requise: \`${
                        typeof command.permission !== "bigint"
                            ? command.permission
                            : new Discord.PermissionsBitField(command.permission).toArray(
                                  false,
                              )
                    }\`\nCommande MP : \`${command.dm ? "Oui" : "Non"}\`\nCatégorie : \`${
                        command.category
                    }\``,
                )
                .setTimestamp()
                .setFooter({ text: "Commande du BOT" });

            await message.reply({ embeds: [Embed] });
        }
    },
};

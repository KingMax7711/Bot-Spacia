const Discord = require("discord.js");

module.exports = async (bot) => {
    let commands = [];

    bot.commands.forEach(async (command) => {
        let slashcommand = new Discord.SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
            .setDMPermission(command.dm)
            .setDefaultMemberPermissions(
                command.permission === "Aucune" ? null : command.permission,
            );

        if (command.options?.length >= 1) {
            for (let i = 0; i < command.options.length; i++) {
                if (command.options[i].type === "string") {
                    slashcommand[
                        `add${
                            command.options[i].type[0].toUpperCase() +
                            command.options[i].type.slice(1)
                        }Option`
                    ]((option) =>
                        option
                            .setName(command.options[i].name)
                            .setDescription(command.options[i].description)
                            .setAutocomplete(command.options[i].autocomplete)
                            .setRequired(command.options[i].required),
                    );
                } else
                    slashcommand[
                        `add${
                            command.options[i].type[0].toUpperCase() +
                            command.options[i].type.slice(1)
                        }Option`
                    ]((option) =>
                        option
                            .setName(command.options[i].name)
                            .setDescription(command.options[i].description)
                            .setRequired(command.options[i].required),
                    );
            }
        }

        await commands.push(slashcommand);
    });

    const rest = new Discord.REST({ version: "10" }).setToken(bot.token);

    await rest.put(Discord.Routes.applicationCommands(bot.user.id), { body: commands });
    console.log("Les Slash Commands sont active !");
};

const Discord = require("discord.js");

module.exports = async (bot, interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {
        let entry = interaction.options.getFocused();

        if (interaction.commandName === "help") {
            let choices = bot.commands.filter((cmd) => cmd.name.includes(entry));
            await interaction.respond(
                entry === ""
                    ? bot.commands.map((cmd) => ({ name: cmd.name, value: cmd.name }))
                    : choices.map((choice) => ({
                          name: choice.name,
                          value: choice.name,
                      })),
            );
        }
        if (interaction.commandName === "grid-switch") {
            const gridStatus = ["Primary", "Emergency", "OFF"];
            const entry = interaction.options.getString("reseaux");
            const choices = gridStatus.filter((status) => status.includes(entry));

            await interaction.respond(
                entry === ""
                    ? gridStatus.map((status) => ({ name: status, value: status }))
                    : choices.map((choice) => ({ name: choice, value: choice })),
            );
        }
    }

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        let command = require(`../Commands/${interaction.commandName}`);
        command.run(bot, interaction, interaction.options);
    }
};

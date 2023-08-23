const fs = require("fs");

module.exports = async (bot) => {
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Commands", "Status");

    fs.readdirSync("./Commands")
        .filter((f) => f.endsWith(".js"))
        .forEach(async (file) => {
            let command = require(`../Commands/${file}`);
            if (!command.name || typeof command.name !== "string")
                throw new TypeError(
                    `La commande ${file.slice(
                        0,
                        file.length - 3,
                    )} possèdent un nom invalide`,
                );
            bot.commands.set(command.name, command);
            table.addRow(command.name, "✅");
        });

    console.log(table.toString(), "\nCommands Loaded");
};

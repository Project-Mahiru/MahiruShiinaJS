// I HAVE NO IDEA WHAT THIS CODE DOES, I MADE IT AT LIKE MIDNIGHT AND I DON'T KNOW WHAT IT DOES, I NEED IT THOUGH
// Figured it out now, Thank you winword.zip for the help

require("dotenv").config();
const fs = require("node:fs");
const { REST, Routes } = require("discord.js");

async function deployCommands(client) {
    const commands = [];
    const commandFiles = fs
        .readdirSync("./commands")
        .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`
        );
        const data = await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands }
        );

        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`
        );
    } catch (error) {
        console.error(error);
    }
}

module.exports = deployCommands;

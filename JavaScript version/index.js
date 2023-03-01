// Require the necessary discord.js classes
const { Client, GatewayIntentBits, REST, Routes, ActivityType, Collection, Events } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const fetch = require('@replit/node-fetch');
const path = require('path');
const deployCommands = require('./deploy-commands.js');
const query = require('./lib/HuggingFaceAPI.js');

// loads .env file as enviorment varibles
require("dotenv").config();

//comment out this line with not running on free hosting ex, replit
const keepAlive = require('./server.js');
keepAlive();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Log in to Discord with your client's token
client.login(process.env.TOKEN);

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, async () => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
	client.user.setActivity("with Chitose", { type: ActivityType.Playing });
	client.user.setStatus("online");
	await deployCommands(client);
	prompt = 'Hello!';
	const data = await query({
		inputs: {
			text: prompt,
		},
	});

	if (data.hasOwnProperty('generated_text')) {
		console.log(data.generated_text)
	} else if (data.hasOwnProperty('error')) { // error condition
		console.log(data.error);
	}
	const commandsPath = path.join(__dirname, "commands");
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}
});

// On Interaction, commands, button, etc do:
client.on(Events.InteractionCreate, async (interaction) => {
	const command = client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true,
		});
	}
});

// On Joining a new Server do:
client.on(Events.GuildCreate, async () => {
	console.log('Added to new server, Deploying commands');
	await deployCommands(client);
});
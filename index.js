// Require the necessary discord.js classes
const {
	Client,
	GatewayIntentBits,
	ActivityType,
	Collection,
	Events,
} = require("discord.js");
const fs = require("fs");
const path = require("path");
const deployCommands = require("./deploy-commands.js");
const dockerChecker = require("./lib/dockerChecker");
const query = require("./lib/huggingFaceAPI.js");

// if not running on docker
if (dockerChecker()) {
	console.log("Docker Detected, will load varible from Docker envs")
} else {
	// loads .env file as enviorment varibles
	require("dotenv").config();
}

// enable keepalive
if (process.env.ENABLE_KEEPALIVE) {
	const keepAlive = require("./server.js");
	keepAlive();
} else {
	//comment out this line if not running on free hosting ex, replit
	console.warn('Keepalive is Disabled, if you wish to enable it please add "ENABLE_KEEPALIVE=TRUE" to your .env file')
}

if (process.env.LOCALAPI) {
	console.log('Local API Base URL is present, the bot will use the local API from now on')
}

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
	try {
		let prompt = "Hello";

		const data = await query(prompt);

		console.log(data);
	} catch (error) {
		console.error(error);
		await interaction.editReply(`An error occurred: ${error.message}`);
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
		await command.execute(client, interaction);
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
	console.log("Added to new server, Deploying commands");
	await deployCommands(client);
});

process.on('unhandledRejection', (reason, p) => {
    console.log('=== unhandled Rejection ==='.toUpperCase().yellow.dim);
    console.log('Reason:\n ', reason.stack ? String(reason.stack).gray : String(reason).gray);
    console.log('=== unhandled Rejection ==='.toUpperCase().yellow.dim);
});
process.on("uncaughtException", (err, origin) => {
    console.log('=== uncaught Exception ==='.toUpperCase().yellow.dim);
    console.log('Exception:\n ', err.stack ? err.stack : err)
    console.log('=== uncaught Exception ==='.toUpperCase().yellow.dim);
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('=== uncaught Exception Monitor ==='.toUpperCase().yellow.dim);
});
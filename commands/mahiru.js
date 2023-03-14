const { SlashCommandBuilder } = require('discord.js');
const query = require('../lib/huggingFaceAPI');
require('dotenv').config()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mahiru')
		.setDescription('Speak with Mahiru AI')
    .addStringOption(option =>
      option.setName('prompt')
        .setDescription('Enter a prompt')
        .setRequired(true)),
	async execute(client, interaction) {
		await interaction.deferReply();

		try {
			const prompt = interaction.options.getString('prompt');

			const data = await query(prompt);

			let botResponse = data;
			// send message to channel as a reply
			await interaction.editReply(`\`\`\`Input was: ${prompt}\`\`\`${botResponse}`.replace(/<@[^>]+>/g, '<removed>'));
		} catch (error) {
			console.error(error);
			if (error.message.includes("ECONNREFUSED") || error.message.includes("EHOSTUNREACH")) {
			  await interaction.editReply("Looks like the mahiru is sleeping, please come back when she's awake.");
			} else {
			  await interaction.editReply(`An error occurred: ${error.message}`);
			}
		  }
		  
	}
};

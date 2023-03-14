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

		const prompt = interaction.options.getString('prompt');

		const data = await query(prompt);

		let botResponse = data;
		// send message to channel as a reply
		await interaction.editReply(`\`\`\`Input was: ${prompt}\`\`\`${botResponse}`.replace(/<@[^>]+>/g, '<removed>'));
	}
};

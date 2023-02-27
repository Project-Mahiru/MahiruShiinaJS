const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
const huggingface = require('../lib/HuggingFaceAPI');
require('dotenv').config()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mahiru')
		.setDescription('Speak with Mahiru AI')
    .addStringOption(option =>
      option.setName('prompt')
        .setDescription('Enter a prompt')
        .setRequired(true)),
	async execute(interaction) {
		const prompt = interaction.options.getString('prompt');

		const data = await huggingface.query({
			inputs: {
				text: prompt,
			},
		});

		let botResponse = '';
		if (data.hasOwnProperty('generated_text')) {
			botResponse = data.generated_text;
			// console.log(data.generated_text)
		} else if (data.hasOwnProperty('error')) { // error condition
			botResponse = data.error;
			console.log(data.error);
		}
		// send message to channel as a reply
		await interaction.reply("```Input was: " + prompt +"```" + botResponse);
	}
};

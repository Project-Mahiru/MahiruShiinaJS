const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
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
	
		// form the payload
		const payload = {
			"inputs": {
				"text": prompt
			}
		};
		
		// console.log(payload)

		const response = await fetch(
			"https://api-inference.huggingface.co/models/Hobospider132/DialoGPT-Mahiru-Proto",
			{
				method: "POST",
				body: JSON.stringify(payload),
				headers: { Authorization: "Bearer " + process.env.HTOKEN }
			}
		);

		const data = await response.json();
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

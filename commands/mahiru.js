const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mahiru')
		.setDescription('Speak with Mahiru AI'),
	async execute(interaction) {
		// ignore messages from the bot itself
		if (interaction.user.bot) {
			return;
		}

		// form the payload
		const payload = {
			inputs: {
				text: interaction.content
			}
		};

		console.log(payload)
		
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
			console.log(data.generated_text)
		} else if (data.hasOwnProperty('error')) { // error condition
			botResponse = data.error;
			console.log(data.error);
		}
		// send message to channel as a reply
		await interaction.reply(botResponse);
	}
};

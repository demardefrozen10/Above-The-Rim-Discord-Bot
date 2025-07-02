const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gameplayrules')
		.setDescription('Gameplay rules for ATR.'),
	async execute(interaction) {

    const secondEmbed = new EmbedBuilder()
	  .setTitle('📘 Gameplay Rules')
	  .setDescription(
		`Note: Any violation of the following rules will result in a game suspension of your best player.\n\n` +

		`**Rule #1 - Bench Minutes** \n` +
		`Must run a 8 man rotation, with 8 players playing a minimum of 10 minutes per game.\n\n` +
	
		`**Rule #2 - On-Ball Defense** \n` +
		`• Must play on-ball defense, unless a play is being ran, you're in transition, or a pick/pop action. In that case, you may switch onto the defender that is in the action, however upon completion, you MUST go back to the on-ball player. In a zone, you can use any defender "off-ball".\n\n` +
	
		`**Rule #3 - No 5-out offense** \n` +
		`5-out offense is not allowed. If you're running a quick isolation, your freelance setting must be in 4-out-1 active otherwise you will be in 5-out!\n\n` +
	
		`**Rule #4 - Player Positions** \n` +
		`You can only play a players position based on their player card. If you want to switch to a different position, you can purchase a position change.\n\n` +
	
		`**Rule #5 - Don't Be Toxic** \n` +
		`Have fun! Don't be toxic and enjoy our community.\n\n` +

		`**Rule #6 - Timer Expiry** \n` +
		`If a player is gone too long without notice, after 3 times, you can quit and recieve the win.\n\n` +

		`**Rule #7 - No Simming CPU Games** \n` +
		`You will be punished for simming CPU games.\n\n`
	  )
	  .setColor(0xED4245); 
    
		await interaction.reply({ embeds: [secondEmbed] });
	},
};

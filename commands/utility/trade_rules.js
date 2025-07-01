const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('traderules')
		.setDescription('Trade rules for ATR.'),
	async execute(interaction) {
		const tradeRulesEmbed = new EmbedBuilder()
		.setTitle('📦 Trade Rules')
		.setDescription(
		  `**🔓 Unlocking Trades:**\n\n` +
		  `• 5 games unlocks 2 trades\n` +
		  `• 10 games unlocks 2 more (total: 4)\n` +
		  `• 15 games unlocks 2 more (total: 6)\n` +
		  `• 20 games unlocks 1 more (total: 7)\n` +
		  `• 25 games unlocks 1 more (total: 8)\n` +
		  `• 30 games unlocks 2 more (total: 10)\n` +
		  `• 35 games unlocks 1 more (total: 11)\n` +
		  `• 40 games unlocks 1 more (total: 12)\n\n` +
		  `After 40 games, you unlock **2 trades every 5 games**.\n\n` +
	  
		  `——————————————\n\n` +
	  
		  `**⏳ Trade Cooldown:**\n\n` +
		  `When you acquire a player, a cooldown applies before you can trade them again:\n\n` +
		  `• 60-75 OVR: 1 game\n` +
		  `• 76-80 OVR: 2 games\n` +
		  `• 81-85 OVR: 3 games\n` +
		  `• 86-90 OVR: 4 games\n` +
		  `• 90+ OVR: **Only 1 trade per season**`
		)
		.setColor(0x00AEFF);
	  


		await interaction.reply({ embeds: [tradeRulesEmbed] });
	},
};

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('traderules')
		.setDescription('Trade rules for ATR.'),
	async execute(interaction) {
		await interaction.reply(`\`\`\`markdown
TRADE RULES

Unlocking trades:

• 5 Games unlocks two trades.
• 10 Games unlocks two more trades. (4)
• 15 games unlocks two trades. (6)
• 20 games unlocks one more trade. (7)
• 25 games unlocks one more trade. (8)
• 30 games unlocks two more trades. (10)
• 35 games unlocks one more trade. (11)
• 40 games unlocks one more trade. (12)

After 40 games, you can unlock 2 more trades every 5 games.

——————————————

TRADE COOLDOWN

When you accquire a player, there is a cooldown required before you can ship him off again.

60-75 overall: 1 game.
76-80 overall: 2 games.
81-85 overall: 3 games.
86-90 overall: 4 games.
90+ overall: Traded once per season only.

\`\`\``);
	},
};

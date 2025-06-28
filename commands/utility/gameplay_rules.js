const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gameplayrules')
		.setDescription('Gameplay rules for ATR.'),
	async execute(interaction) {
		await interaction.reply(`\`\`\`markdown
GAMEPLAY RULES

• Must run a minimum of 8 player rotation. These 8 players must play at least 10 minutes per game.

• Must play on-ball defense at all times, unless the following:

  - Zone defense: You may play any player in the zone.
  - Pick and roll/pop: You may switch off to play the roller/popper.
  - Fastbreaks: You can switch to any defender.
  - Plays being run: You can switch onto the player the play is being run for.
  - Help defense: You can switch if you got beat on a play.

• Must play the positions based on their player cards ONLY.

• 5 out offense is strictly prohibited.

  - If you run a "quick isolation" play, you MUST have your freelance setting set to "4-out-1-active" or it will count as 5 out.

NOTE: Any violation of these rules will result in a suspension of your best player.
\`\`\``);
	},
};

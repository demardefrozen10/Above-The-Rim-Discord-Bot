const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gamereset')
    .setDescription('Reset a game due to lag out, rule violation, etc.')
    .addStringOption(option =>
      option.setName('teama')
        .setDescription('Your team name.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('teamb')
        .setDescription('Your opponent team name.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for resetting game.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('date')
        .setDescription('Date of the game (MM/DD).')
        .setRequired(true)
    )
    .addAttachmentOption(option =>
      option.setName('proofscreenshot')
        .setDescription('Provide image of lag out or anything else (optional).')
        .setRequired(false)
    ),
  async execute(interaction) {
    const teamA = interaction.options.getString('teama');
    const teamB = interaction.options.getString('teamb');
    const reason = interaction.options.getString('reason');
    const date = interaction.options.getString('date');
    const proofScreenshot = interaction.options.getAttachment('proofscreenshot');

    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/; 
    if (!dateRegex.test(date)) {
      await interaction.reply({
        content: '❌ Invalid date format. Please use MM/DD (e.g., 12/25 for December 25).',
        ephemeral: true,
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle('🔄 Game Reset Request')
      .addFields(
        { name: 'Team A', value: teamA, inline: true },
        { name: 'Team B', value: teamB, inline: true },
        { name: 'Reason', value: reason, inline: false },
        { name: 'Date', value: date, inline: true }
      );

    if (proofScreenshot) {
      embed.setImage(proofScreenshot.url);
    }

    const channelId = '1389253628577190059'; 

    await interaction.reply({ content: `Game reset submitted in <#${channelId}>!`, ephemeral: true });
    const channel = interaction.client.channels.cache.get(channelId);

    if (channel && channel.isTextBased()) {
      await channel.send({ embeds: [embed] });
    } else {
      console.error('Channel not found or not text-based.');
    }
  },
};
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('freeagentrequest')
    .setDescription('Request a free agent to be signed.')
    .addStringOption(option =>
        option.setName('team')
          .setDescription('Your team name.')
          .setRequired(true)
      )
      .addStringOption(option =>
        option.setName('player')
          .setDescription('Player name.')
          .setRequired(true)
      )
    .addStringOption(option =>
      option.setName('position')
        .setDescription('Player position.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('overall')
        .setDescription('Player overall rating.')
        .setRequired(true)
    )
     .addStringOption(option =>
      option.setName('dropplayer')
        .setDescription('Player you\'re releasing to sign him.')
        .setRequired(true)
    ),

  async execute(interaction) {
    const playerName = interaction.options.getString('player');
    const position = interaction.options.getString('position');
    const overall = interaction.options.getString('overall');
    const dropPlayer = interaction.options.getString('dropplayer');
    const team = interaction.options.getString('team');


    var embed = new EmbedBuilder()
      .setTitle('Free Agent Request')
      .addFields(
        { name: 'Player Name', value: `${playerName}`, inline: true },
        { name: 'Position', value: `${position}`, inline: true },
        { name: 'Overall Rating', value: `${overall}`, inline: true },
        { name: 'Player Released', value: `${dropPlayer}`, inline: true }
      )
      .setFooter({ text: `Submitted by ${team} (${interaction.user.tag})` })
      .setTimestamp();


      const channelId = '1389109674594406592'; 

      await interaction.reply({ content: `Free agent signing request submitted in <#${channelId}>!`, ephemeral: true });


    const channel = interaction.client.channels.cache.get(channelId);

    if (channel && channel.isTextBased()) {
      await channel.send({ embeds: [embed] });
    } else {
      console.error('Channel not found or not text-based.');
    }
  },
};

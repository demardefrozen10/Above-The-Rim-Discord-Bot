const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Player, NBATeams } = require('../../database/NBATeam.js');
const { Op } = require('sequelize');

// Helper function to capitalize name
function capitalizeName(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

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
    try {
      let playerName = interaction.options.getString('player');
      let position = interaction.options.getString('position');
      const overall = interaction.options.getString('overall');
      let dropPlayer = interaction.options.getString('dropplayer');
      const team = interaction.options.getString('team');

      // Capitalize names and position
      playerName = capitalizeName(playerName);
      position = capitalizeName(position);
      dropPlayer = capitalizeName(dropPlayer);

      // Get team from database
      const teamData = await NBATeams.findOne({
        where: { teamName: { [Op.like]: `%${team}%` } }
      });

      if (!teamData) {
        await interaction.reply({
          content: `❌ Team "${team}" not found in the database.`,
          flags: 64
        });
        return;
      }

      // Check if drop player exists on the team
      const dropPlayerExists = await Player.findOne({
        where: {
          playerName: { [Op.like]: `%${dropPlayer}%` },
          teamId: teamData.id
        }
      });

      if (!dropPlayerExists) {
        await interaction.reply({
          content: `❌ Player "${dropPlayer}" not found on ${team}.`,
          flags: 64
        });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle('🆓 Free Agent Signing Request')
        .addFields(
          { name: 'Team', value: `${team}`, inline: true },
          { name: 'Player Name', value: `${playerName}`, inline: true },
          { name: 'Position', value: `${position}`, inline: true },
          { name: 'Overall Rating', value: `${overall}`, inline: true },
          { name: 'Player Released', value: `${dropPlayer}`, inline: false }
        )
        .setFooter({ text: `Submitted by ${interaction.user.tag}` })
        .setTimestamp();

      // Create approve button
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`approve_fa_${teamData.id}_${playerName}_${dropPlayer}`)
            .setLabel('✅ Approve')
            .setStyle(ButtonStyle.Success)
        );

      const channelId = '1389109674594406592';

      await interaction.reply({ 
        content: `Free agent signing request submitted in <#${channelId}>!`, 
        flags: 64 
      });

      const channel = interaction.client.channels.cache.get(channelId);

      if (channel && channel.isTextBased()) {
        const message = await channel.send({ 
          embeds: [embed],
          components: [row]
        });

        // Store FA data for button interaction
        const faData = {
          messageId: message.id,
          team,
          teamId: teamData.id,
          playerName,
          position,
          overall,
          dropPlayer
        };

        interaction.client.pendingFA = interaction.client.pendingFA || new Map();
        interaction.client.pendingFA.set(`${teamData.id}_${playerName}`, faData);
      } else {
        console.error('Channel not found or not text-based.');
      }
    } catch (error) {
      console.error('Error processing free agent request:', error);
      await interaction.reply({
        content: '❌ An error occurred while processing your request.',
        flags: 64
      });
    }
  }
};
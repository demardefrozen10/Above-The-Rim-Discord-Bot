const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { NBATeams, Player } = require('../../database/NBATeam.js');
const { Op } = require('sequelize');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trade')
    .setDescription('Submit a trade to be reviewed by the ATR trade committee.')
    .addStringOption(option =>
      option.setName('team1')
        .setDescription('Your team name.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('team2')
        .setDescription('The other team name.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('team1record')
        .setDescription('Your team record.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('team2record')
        .setDescription('The other team record.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('team1players')
        .setDescription("Your team's player(s) involved in the trade, separated by commas.")
        .setRequired(true)
    ) 
    .addStringOption(option =>
      option.setName('team2players')
        .setDescription("The other team's player(s) involved in the trade, separated by commas.")
        .setRequired(true)
    ) 
    .addAttachmentOption(option =>
      option.setName('tradescreenshot')
        .setDescription('Image of your trade on 2K.')
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const team1 = interaction.options.getString('team1');
      const team2 = interaction.options.getString('team2');
      const record1 = interaction.options.getString('team1record');
      const record2 = interaction.options.getString('team2record');
      const screenshot = interaction.options.getAttachment('tradescreenshot');

      const team1players = interaction.options.getString('team1players');
      const team2players = interaction.options.getString('team2players');

      const team1PlayerList = team1players.split(',').map(p => p.trim());
      const team2PlayerList = team2players.split(',').map(p => p.trim());

      // Get both teams in parallel
      const [teamA, teamB] = await Promise.all([
        NBATeams.findOne({ where: { teamName: { [Op.like]: `%${team1}%` } } }),
        NBATeams.findOne({ where: { teamName: { [Op.like]: `%${team2}%` } } })
      ]);

      if (!teamA || !teamB) {
        await interaction.reply({
          content: `❌ One or both teams do not exist.\nTeam 1: ${teamA ? '✅' : '❌'} | Team 2: ${teamB ? '✅' : '❌'}`,
          flags: 64
        });
        return;
      }

      // Query all players in both teams at once (much faster)
      const [foundTeam1Players, foundTeam2Players] = await Promise.all([
        Player.findAll({
          where: {
            playerName: { [Op.or]: team1PlayerList.map(name => ({ [Op.like]: `%${name}%` })) },
            teamId: teamA.id
          },
          attributes: ['playerName']
        }),
        Player.findAll({
          where: {
            playerName: { [Op.or]: team2PlayerList.map(name => ({ [Op.like]: `%${name}%` })) },
            teamId: teamB.id
          },
          attributes: ['playerName']
        })
      ]);

      // Find missing players
      const foundTeam1Names = foundTeam1Players.map(p => p.playerName);
      const foundTeam2Names = foundTeam2Players.map(p => p.playerName);

      const notFoundPlayers = [
        ...team1PlayerList.filter(name => !foundTeam1Names.some(found => found.toLowerCase().includes(name.toLowerCase()))),
        ...team2PlayerList.filter(name => !foundTeam2Names.some(found => found.toLowerCase().includes(name.toLowerCase())))
      ];

      if (notFoundPlayers.length > 0) {
        await interaction.reply({
          content: `❌ The following players do not exist or are not on their respective teams:\n${notFoundPlayers.map(p => `• ${p}`).join('\n')}`,
          flags: 64
        });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle('📥 New Trade Submission')
        .addFields(
          { name: 'Team 1', value: `${team1} (${record1})`, inline: true },
          { name: 'Team 2', value: `${team2} (${record2})`, inline: true },
          { name: `${team1} Trading`, value: team1players, inline: false },
          { name: `${team2} Trading`, value: team2players, inline: false }
        )
        .setImage(screenshot.url)
        .setFooter({ text: `Submitted by ${interaction.user.tag}` })
        .setTimestamp();

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`approve_trade_${team1}_${team2}`)
            .setLabel('✅ Approve')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId(`deny_trade_${team1}_${team2}`)
            .setLabel('❌ Deny')
            .setStyle(ButtonStyle.Danger)
        );

      await interaction.reply({ content: '✅ Trade submitted and sent to the committee.', flags: 64 });

      const channelId = '1373498057525690479'; 
      const channel = interaction.client.channels.cache.get(channelId);

      if (channel && channel.isTextBased()) {
        const message = await channel.send({ 
          embeds: [embed],
          components: [row]
        });

        const tradeData = {
          messageId: message.id,
          team1,
          team2,
          team1PlayerList,
          team2PlayerList,
          teamAId: teamA.id,
          teamBId: teamB.id
        };
        
        interaction.client.pendingTrades = interaction.client.pendingTrades || new Map();
        interaction.client.pendingTrades.set(`${team1}_${team2}`, tradeData);
      }
    } catch (error) {
      console.error('Error processing trade:', error);
      await interaction.reply({
        content: '❌ An error occurred while processing your trade.',
        flags: 64
      });
    }
  }
};
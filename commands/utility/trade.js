const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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
    .addAttachmentOption(option =>
      option.setName('tradescreenshot')
        .setDescription('Image of your trade on 2K.')
        .setRequired(true)
    ),

  async execute(interaction) {
    const team1 = interaction.options.getString('team1');
    const team2 = interaction.options.getString('team2');
    const record1 = interaction.options.getString('team1record');
    const record2 = interaction.options.getString('team2record');
    const screenshot = interaction.options.getAttachment('tradescreenshot');


    function parseGamesPlayed(record) {
      const [wins, losses] = record.split('-').map(Number);
      if (isNaN(wins) || isNaN(losses)) return null;
      return wins + losses;
    }
    
    const gamesPlayed = parseGamesPlayed(record1);
    if (gamesPlayed === null) {
      await interaction.reply({ content: `Invalid record format. Please use W-L format like "5-5".`, ephemeral: true });
      return;
    }
    


    const tradeCommittee = '1375171673107726457';

    const embed = new EmbedBuilder()
      .setTitle('📥 New Trade Submission')
      .addFields(
        { name: 'Team 1', value: `${team1} (${record1})`, inline: true },
        { name: 'Team 2', value: `${team2} (${record2})`, inline: true }
      )
      .setImage(screenshot.url)
      .setDescription(`<@&${tradeCommittee}>`)
      .setFooter({ text: `Submitted by ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.reply({ content: '✅ Trade submitted and sent to the committee.', ephemeral: true });


    const channelId = '1373498057525690479'; 
    const channel = interaction.client.channels.cache.get(channelId);

    if (channel && channel.isTextBased()) {
      await channel.send({ embeds: [embed] });
    } else {
      console.error('Channel not found or not text-based.');
    }
  }
};

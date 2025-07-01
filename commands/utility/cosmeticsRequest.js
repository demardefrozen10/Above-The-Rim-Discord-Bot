const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cosmeticsrequest')
    .setDescription('Request a cosmetic change for a player.')
    .addStringOption(option =>
      option.setName('playername')
        .setDescription('The name of the player you want to change cosmetics for.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('typeofchange')
        .setDescription('Type of cosmetic change requested.')
        .setRequired(true)
        .addChoices(
          { name: 'Hair', value: 'Hair' },
          { name: 'Socks', value: 'Socks' },
          { name: 'Sleeves', value: 'Sleeves' },
          { name: 'Shoes', value: 'Shoes' },
          { name: 'Jersey Number', value: 'Jersey Number' },
          { name: 'Other', value: 'other' }
        )
    )
    .addStringOption(option =>
        option.setName('details')
          .setDescription('Add details about the cosmetic change (i.e what sleeve, which leg, etc.)')
          .setRequired(true)
      )
      .addStringOption(option =>
        option.setName('team')
          .setDescription('Your team name.')
          .setRequired(true)
      )
    .addStringOption(option =>
      option.setName('existingjerseynumber')
        .setDescription('Who currently has the jersey number? (if applicable)')
        .setRequired(false)
    ),

  async execute(interaction) {
    const playerName = interaction.options.getString('playername');
    const typeOfChange = interaction.options.getString('typeofchange');
    const jerseyNumber = interaction.options.getString('existingjerseynumber');
    const details = interaction.options.getString('details');
    const team = interaction.options.getString('team');


    var embed = new EmbedBuilder()
      .setTitle('👟 New Cosmetic Request')
      .addFields(
        { name: 'Player Name', value: `${playerName}`, inline: true },
        { name: 'Type of Request', value: `${typeOfChange}`, inline: true },
        { name: 'Details of Change', value: `${details}`, inline: true }
      )
      .setFooter({ text: `Submitted by ${team} (${interaction.user.tag})` })
      .setTimestamp();

    const pacersUserId = '586091455182012436';
    const hornetsUserId = '1114573543150190762';

    const channelId = '1389249054353002659'; 

    const notificationEmbed = new EmbedBuilder()
    .setTitle(`NEW REQUEST IN <#${channelId}>!`)
    .setDescription(`<@${pacersUserId}> <@${hornetsUserId}> STOP BEING LAZY BITCHES AND DO EM`)
    .setFooter({ text: `Submitted by ${interaction.user.tag}` })
    .setTimestamp();
  

      if (jerseyNumber) {
        embed.addFields({ name: 'Existing Jersey Number', value: `${jerseyNumber}`, inline: true });
      }
      const notificationChannelId = '1385712418641936568';


      await interaction.reply({ content: `Cosmetic request submitted in <#${channelId}>!`, ephemeral: true });


    const channel = interaction.client.channels.cache.get(channelId);
    const notificationChannel= interaction.client.channels.cache.get(notificationChannelId);

    if (channel && channel.isTextBased()) {
      await channel.send({ embeds: [embed] });
      await notificationChannel.send({ embeds: [notificationEmbed] });
    } else {
      console.error('Channel not found or not text-based.');
    }
  },
};
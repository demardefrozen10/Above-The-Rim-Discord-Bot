const { SlashCommandBuilder, PermissionFlagsBits  } = require('discord.js');
const { Player, NBATeams } = require('../../database/NBATeam.js');
const { Op } = require('sequelize');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addplayer')
        .setDescription('Add a player to a roster.')
        .addStringOption(option =>
            option.setName('player')
                .setDescription('The full name of the NBA player.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('team')
                .setDescription('The NBA team name.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('overall')
                .setDescription('The overall of the player.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('position')
                .setDescription('The position of the player.')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const playerName = interaction.options.getString('player');
        const teamName = interaction.options.getString('team');
        const position = interaction.options.getString('position');
        const overall = interaction.options.getString('overall');



        try {
            const team = await NBATeams.findOne({
                where: {
                  teamName: {
                    [Op.like]: `%${teamName}`,
                  },
                },
              });

              if (!team) {
                await interaction.reply(`❌ No team found matching "${teamName}".`);
                return;
            }

            await Player.create({ playerName: `${playerName}`, position: `${position}`, overall: `${overall}`, teamId: team.id });

            await interaction.reply(`✅ Player "${playerName}" has been added to the team "${team.teamName}".`);



        } catch (error) {
            console.error('Error querying the database:', error);
            await interaction.reply('❌ An error occurred while retrieving the player information.');
        }
    },
};
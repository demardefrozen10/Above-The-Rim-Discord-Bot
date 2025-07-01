const { SlashCommandBuilder, PermissionFlagsBits  } = require('discord.js');
const { Player } = require('../../database/NBATeam.js');
const { Op } = require('sequelize');
const sequelize = require('../../database/sequelize.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeplayer')
        .setDescription('Add a player to a roster.')
        .addStringOption(option =>
            option.setName('player')
                .setDescription('The full name of the NBA player.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('team')
                .setDescription('The full NBA team name.')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const playerName = interaction.options.getString('player');
        const teamName = interaction.options.getString('team');


        try {
            const player = await Player.findOne({
                where: {
                    playerName: {
                        [Op.like]: `%${playerName}%`,
                    },
                    teamId: {
                        [Op.eq]: sequelize.literal(`(SELECT id FROM NBATeams WHERE teamName LIKE '%${teamName}%')`), 
                    },
                },
            });
        
            if (!player) {
                await interaction.reply(`❌ No player found matching "${playerName}" on team "${teamName}".`);
                return;
            }
        
            await player.destroy();
        
            await interaction.reply(`✅ Player "${playerName}" has been removed from team "${teamName}".`);


        } catch (error) {
            console.error('Error querying the database:', error);
            await interaction.reply('❌ An error occurred while retrieving the player information.');
        }
    },
};
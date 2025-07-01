const { SlashCommandBuilder } = require('discord.js');
const { NBATeams, Player } = require('../../database/NBATeam.js');
const { Op } = require('sequelize'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('teamroster')
        .setDescription('Get a team\'s roster.')
        .addStringOption(option =>
            option.setName('team')
                .setDescription('The name of the NBA team.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const teamName = interaction.options.getString('team');

        try {
            const team = await NBATeams.findOne({
                where: {
                    teamName: {
                        [Op.like]: `%${teamName}%`
                    }
                },
                include: {
                    model: Player, 
                    attributes: ['playerName', 'position', 'overall'], 
                },
                order: [[Player, 'overall', 'DESC']]

            });

            if (team) {
                const roster = team.Players.map(player => 
                    `${player.playerName} (${player.position}) - Overall: ${player.overall}`
                ).join('\n');

                const response = `Roster for ${team.teamName}:\n${roster}`;
                await interaction.reply(response);
            } else {
                await interaction.reply(`❌ No team found matching "${teamName}".`);
            }
        } catch (error) {
            console.error('Error querying the database:', error);
            await interaction.reply('❌ An error occurred while retrieving the roster.');
        }
    },
};